const jwt = require('jsonwebtoken');
const isRequest = (actionRights:any, path:string, method:string)=>{
    const reg = new RegExp(`^${actionRights.rightsPath}(/[0-9]*)?$`, 'i');
    if(reg.test(path) && actionRights.rightsMethod === method) return true;
    if(actionRights.children){
        for(let i = 0; i < actionRights.children.length; i++){
            const item = actionRights.children[i];
            if(isRequest(item, path, method)) return true;
        }
    }
    return false;
}

const getActionRights = (ctx)=>{
    const userInfo = ctx.session.user;
    if(!userInfo) return null;
    const actionRights = userInfo.rightsTree.filter((rights:any)=>{
        if(rights.rightsType === 'action') return rights;
    });
    return actionRights[0];
};


let actionRights;


module.exports = (_options, app) => {
    return async function (ctx, next) {

       // /api/vi/users
        // /api/vi/users?page=1&pageSize=5;
        let curPath = ctx.url.toLowerCase();
        const curMethod = ctx.request.method.toLowerCase();
        if(!curPath.startsWith('/api/v1')){
            // 不需要权限控制
            await next();
            return;
        }

        if(!actionRights){
            actionRights = getActionRights(ctx);
        }
        if(!actionRights){
            ctx.error(400, '没有权限');
            return;
        }
        const idx = curPath.indexOf('?');
        if(idx !== -1){
            // /api/vi/users?page=1&pageSize=5; -> /api/vi/users
            curPath = curPath.substr(0, idx);

        }
        const flag = isRequest(actionRights, curPath, curMethod);
        if(flag){
            const token = ctx.cookies.get('token', {
                signed: false,
            });
            
            // 4.判断客户端有没有传递JWT令牌
            if(token){
                try {
                    await jwt.verify(token, app.config.keys);
                    /*
                     必须加await,因为 next代表着某个路由地址的回调方法，这个方法可能是异步的，
                     而 响应可能就是在这个异步方法里，如果不加await，这个中间件不会等待 回调方法执行
                     完毕就结束程序了，测试响应还没触发，比如第三方登陆成功之后(github.ts)，会返回
                     ctx.body='xxx',并且是这个异步的，所以这里必须加await，这次才会等响应结束在执行
                     下一步
                     */
                    await next();
                }catch (e) {
                    ctx.error(400, '没有权限');
                }
            }else{
                ctx.error(400, '没有权限');
            }
        }
        else{
           
            ctx.error(400, '没有权限');
        }






        // // 1.获取需要权限控制的路由地址
        // const authUrls = options.authUrls;
        // // 2.判断当前请求的路由地址是否需要权限控制

        // console.log("请求的url",ctx.url);

        // if(authUrls.includes(ctx.url)){
        //     // 需要权限控制
        //     // 3.获取客户端传递过来的JWT令牌
        //     //不从 header中获取了
        //     //const token = ctx.get('authorization');
        //     // 从cookie中获取token
        //    // const token = ctx.cookies.get('token');
        //     // 需要权限控制
        //     // 3.获取客户端传递过来的JWT令牌
        //     // 注意点: 如果设置cookie的时候没有签名, 那么获取的时候也要告诉egg不需要签名, 否则会获取不到
        //     const token = ctx.cookies.get('token', {
        //         signed: false,
        //     });
            
        //     // 4.判断客户端有没有传递JWT令牌
        //     if(token){
        //         try {
        //             await jwt.verify(token, app.config.keys);
        //             /*
        //              必须加await,因为 next代表着某个路由地址的回调方法，这个方法可能是异步的，
        //              而 响应可能就是在这个异步方法里，如果不加await，这个中间件不会等待 回调方法执行
        //              完毕就结束程序了，测试响应还没触发，比如第三方登陆成功之后(github.ts)，会返回
        //              ctx.body='xxx',并且是这个异步的，所以这里必须加await，这次才会等响应结束在执行
        //              下一步
        //              */
        //             await next();
        //         }catch (e) {
        //             ctx.error(400, '没有权限');
        //         }
        //     }else{
        //         ctx.error(400, '没有权限');
        //     }
        // }else{
        //     // 不需要权限控制
        //     /*
        //      */
        //     await next();
        //     console.log("响应完成之后，中间件接着执行")
        // }
    }
};
