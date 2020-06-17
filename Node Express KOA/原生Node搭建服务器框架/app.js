/*服务端业务逻辑的核心文件*/
/*处理各种请求*/
const queryString = require('querystring');
const goodsRouterHandle = require('./router/goods');
const userRouterHandle = require('./router/user');
const staticServer = require('./utils/staticServer');
const path = require('path');
const rootPath = path.join(__dirname, 'public');
const {redisGet,redisSet} = require('./db/redis');
//const SESSION_CONTAINER = [];
const writeLog = require('./utils/log');
require('./db/sync');

const getCookieExpires = () =>{
    let date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    return date.toGMTString();
}
const initCookieSession = async (req, res) =>{
    // 1.处理Cookie
    req.cookie = {};
    if(req.headers.cookie){
        req.headers.cookie.split(';').forEach((item)=>{
            let keyValue = item.split('=');
            req.cookie[keyValue[0]] = keyValue[1];
        });
    }
   // 2.获取用户的唯一标识
   req.userId = req.cookie.userId;
   if(!req.userId){
       req.userId = `${Date.now()}_${Math.random()}_it666`;
       // 给当前用户分配容器
       // SESSION_CONTAINER[req.userId] = {};
       req.session = {};
       res.setHeader('Set-Cookie',`userId=${req.userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
   }
   // if(!SESSION_CONTAINER[req.userId]){
   //     // 给当前用户分配容器
   //     SESSION_CONTAINER[req.userId] = {};
   // }
   if(!req.session){
       req.session = await redisGet(req.userId) || {};
   }
   console.log(req.session);
   // req.session = SESSION_CONTAINER[req.userId];

   //console.log("redis 返回值:"+ await redisGet(req.userId));

}

// 准备各种请求参数
const initParams = (req) =>{
    // 准备 请求方式 / 请求路径 / 请求参数
    // 1.处理请求方式
    req.method = req.method.toLowerCase();
    // 2.处理请求路径
    req.path = req.url.split('?')[0];
    // 3.处理请求参数
    return new Promise((resolve, reject)=>{
        if(req.method === 'get'){
            let params = req.url.split('?')[1];
            req.query = queryString.parse(params);
            resolve();
        }else if(req.method === 'post'){
            let params = '';
            req.on('data', (chunk)=>{
                params += chunk;
            });
            req.on('end', ()=>{
                console.log(params);
                req.body = queryString.parse(params);
                resolve();
            });
        }
    });
}
const setEnd = (res, data) =>{
    res.writeHead(200, {
        'Content-Type':'application/json; charset=utf-8;'
    });
    res.end(JSON.stringify(data));
}
// 处理各种请求
const serverHandle = async (req, res)=>{


    // redisSet("aaa","111");
    // await redisGet("aaa");

    writeLog(`${req.method}--${req.url}--${req.headers['user-agent']}`)


    // 0.准备cookie和session
    await  initCookieSession(req, res);
    // 1.返回静态网页
    await staticServer.readFile(req, res, rootPath);
    // 2.处理API请求
    res.setEnd = setEnd;
    //  Cannot set headers after they are sent to the client
    // res.writeHead(200, {
    //     'Content-Type':'application/json; charset=utf-8;'
    // });
    // 1.准备各种请求参数
    initParams(req).then( async ()=>{
        // 2.处理各种路由
        // 2.1处理商品相关路由
        let goodsData = goodsRouterHandle(req, res);
        if(goodsData){
            // res.end(JSON.stringify(goodsData));
            res.setEnd(res, goodsData);
            return
        }
        // 2.2处理用户相关路由
        let userData = await userRouterHandle(req, res);
        if(userData){
            // res.end(JSON.stringify(userData));
            res.setEnd(res, userData);
            return
        }
        // 2.3没有匹配到任何路由
        res.writeHead(404, {
            'Content-Type':'text/plain; charset=utf-8;'
        });
        res.end('404 Not Found');
    })
};
module.exports = serverHandle;