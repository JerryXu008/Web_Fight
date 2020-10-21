import { Controller } from 'egg';
const queryString = require('querystring');
const jwt = require('jsonwebtoken');
import { v4 as uuidv4 } from 'uuid';
export default class GithubController extends Controller {
    public async getLoginView() {

        // key和secret 设置地址：https://github.com/settings/applications/1393243

        /*
           查询文档：
           https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps
        */
        // 1.获取第三方登录界面
        // 发送get请求到https://github.com/login/oauth/authorize带上一些参数即可
        // client_id: Github可以根据这个client_id判断你有没有申请接入
        //            Github会根据这个client_id查询出对应的应用程序名称, 告诉用户正在给哪个程序授权
        // scope    : 授权范围
        const baseURL = 'https://github.com/login/oauth/authorize';
        const option = {
            client_id: '096ef1e42e2325a6ba75',
            scope: 'user'
        }
        const url = baseURL + '?' + queryString.stringify(option);
         console.log(">>>>>>>>",url);
        const {ctx} = this;
        ctx.redirect(url);
    }
    public async getAccessToken(){
        const {ctx} = this;
        // 1.拿到用户同意授权之后的code
        const {code} = ctx.query;
        // 2.利用code换取令牌(access_token)
        // 发送POST请求到https://github.com/login/oauth/access_token带上必要的参数
        const baseURL = 'https://github.com/login/oauth/access_token';
        const option = {
            client_id:'096ef1e42e2325a6ba75',
            client_secret:'3f56998517446b45f5b5e75142f61dd846b1810a',
            code:code
        }
        const result = await ctx.curl(baseURL, {
            method: 'POST',
            data: option,
            dataType: 'json',
            headers:{
                'Content-Type': 'application/json',
                'Accept':'application/json'
            }
        });
        const accessToken = result.data.access_token;
        console.log("获取到的token",accessToken)
        // 3.拿着令牌去资源服务器获取数据
        await this.getGithubUserIinfo(accessToken);
    }
    private async getGithubUserIinfo(accessToken){
       const {ctx} = this;
        const baseURL = 'https://api.github.com/user';
        const url = `${baseURL}`;
     
        console.log("最终url",url);

        const result = await ctx.curl(url, {
            method: 'GET',
            headers:{
                'Authorization':' token '+ accessToken,
                //'Authorization: token': accessToken,
                //'access_token':accessToken,
                //'token':accessToken 
                 
            }
        });
        console.log("获取用户信息")
        console.log(JSON.parse(result.data));
        console.log("对浏览器进行响应");
        const data = JSON.parse(result.data);
        data.provider = 'github';
        await this.go2Admin(data, accessToken);

       
        //ctx.body = 'hello';

    }
    private async go2Admin(data, accessToken){
        const {ctx} = this;
        try {
            // 用户存在直接登录
            const user = await ctx.service.oauth.getUser(data);
            console.log("看看返回的是多少",user)
            
            const token = jwt.sign(user, this.config.keys, {expiresIn: '7 days'});
            console.log(">>>>>>>>>>>>>>",token);
            ctx.cookies.set('token', token, {
                path:'/',
                maxAge: 24 * 60 * 60 * 1000,
                // 注意点: 如果httpOnly: true, 那么前端是无法获取这个cookie
                httpOnly: false,
            });


            ctx.redirect('http://127.0.0.1:8082/admin');
        
        }catch (e) {
            console.log("跑出的异常",e)
            // 用户不存在, 先注册再登录
            // 1.创建一个用户
            // ctx.body = uuidv4(); // dd171f66-f49d-4466-8884-f3f23746f643
            const userInfo = {
                username: uuidv4() ,
                password:'com.123456',
                github: 1
            };
            const user = await ctx.service.user.createUser(userInfo);
            // 2.保存这个用户的授权信息
             // 2.保存这个用户的授权信息
             const oauthInfo = {
                accessToken: accessToken,
                provider: data.provider,
                uid:data.id,
                userId:user ? user.id : -1
            }
            await ctx.service.oauth.createOAuth(oauthInfo);

             // 3.直接登录(跳转到admin界面)
             const token = jwt.sign(user, this.config.keys, {expiresIn: '7 days'});
             ctx.cookies.set('token', token, {
                 path:'/',
                 maxAge: 24 * 60 * 60 * 1000,
                 // 注意点: 如果httpOnly: true, 那么前端是无法获取这个cookie
                 httpOnly: false,
             });
             ctx.redirect('http://127.0.0.1:8082/admin');
        }

    }
    




}
