const jwt = require('jsonwebtoken');
import { v4 as uuidv4 } from 'uuid';

// app.js
module.exports = app => {
    console.log("看看有没有执行")
    app.passport.verify(async (ctx, user) => {
        console.log("第三方插件返回的user信息",user);
        // 从数据库中查找用户信息
        try {
            const existsUser = await ctx.service.oauth.getOAuthUser(user);
           
           
           
            const token = jwt.sign(existsUser, app.config.keys, {expiresIn: '7 days'});
            ctx.cookies.set('token', token, {
                path:'/',
                maxAge: 24 * 60 * 60 * 1000,
                // 注意点: 如果httpOnly: true, 那么前端是无法获取这个cookie
                httpOnly: false,
                signed:false, //设置cookie不需要签名，需要注意的是，在鉴权auth.ts中也要标示为false，否则获取不到浏览器cookie
            });
            console.log("......存在")
            return existsUser;
        }catch (e) {
            console.log(e)
            console.log("......不存在")
            const userInfo = {
                username: uuidv4() ,
                password:'com.123456',
                github: 1
            };
            const newUser = await ctx.service.user.createUser(userInfo);
            const oauthInfo = {
                accessToken: user.accessToken,
                provider: user.provider,
                uid:user.id,
                userId:newUser ? newUser.id : -1
            };
           
            await ctx.service.oauth.createOAuth(oauthInfo);
            
            const token = jwt.sign(newUser, app.config.keys, {expiresIn: '7 days'});
            ctx.cookies.set('token', token, {
                path:'/',
                maxAge: 24 * 60 * 60 * 1000,
                // 注意点: 如果httpOnly: true, 那么前端是无法获取这个cookie
                httpOnly: false,
                signed:false,
            });
            return newUser;
        }
    });
};
