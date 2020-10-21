const nodemailer = require("nodemailer");

let transporter;
export default {
    // 创建发送邮件对象
    createTransporterInstance(ctx){
        if(transporter){
            return transporter;
        }
        transporter = nodemailer.createTransport({
            host: ctx.app.config.smtp.host,
            port: ctx.app.config.smtp.port,
            secure: true, // true for 465, false for other ports
            auth: {
                user: ctx.app.config.smtp.user, // 发送邮件的邮箱
                pass: ctx.app.config.smtp.pass, // 邮箱对应的授权码
            },
        });
        return transporter;
    },
    // 创建需要发送的内容
    createEmailInfo(ctx, to:string){
        // 1.生成验证码
        let code = Math.random().toString(16).slice(2, 6).toUpperCase();
        console.log("邮箱验证码",code)
        // 2.生成发送内容
        let info = {
            from: '97606813@qq.com', // 谁发的
            to: to, // 发给谁
            subject: "知播渔管理后台注册验证码", // 邮件标题
            text: `您正在注册知播渔管理后台系统, 您的验证码是:${code}`, // 邮件内容
        };
        // 3.保存验证码
        ctx.session.email = {
            code: code,
            expire: Date.now() + 60 * 1000 // 验证码1分钟之后过期
        };
        return info;
    },
    // 不加async也可以
    async sendEmailCode(ctx, to:string){
    //    const transporter = this.createTransporterInstance(_ctx);
        const info = this.createEmailInfo(ctx, to);
        console.log(info)
        return new Promise((_resolve, _reject)=>{
            // transporter.sendMail(info, (err, data)=>{
            //     if(err){
            //         reject(err);
            //     }else{
            //         resolve(data);
            //     }
            // })
              _reject( new Error( "邮件发送失败"))
        
        });
    },






    verifyEmailCode(ctx, clientCode){
        // 1.取出服务端中保存的验证码和过期时间
        const serverCaptcha = ctx.session.email;
        let serverCode;
        let serverExpire;
        try {
            serverCode = serverCaptcha.code;
            serverExpire = serverCaptcha.expire;
        }catch (e) {
            // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
            ctx.session.email = null;
            throw new Error('请重新获取验证码');
        }

        if(Date.now() > serverExpire){
            // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
            ctx.session.email = null;
            throw new Error('验证码已经过期');
        }else if(serverCode !== clientCode){
            // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
            ctx.session.email = null;
            throw new Error('验证码不正确');
        }
        // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
        ctx.session.email = null;
    }
}
