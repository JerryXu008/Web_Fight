import { Controller } from 'egg';
import NormalUserRule from '../validate/normalUserRule'
import EmailUserRule from '../validate/emailUserRule'
import PhoneUserRule from '../validate/phoneUserRule'
const jwt = require('jsonwebtoken');
const enum TypeEnum {
    Normal = 'normal',
    Email = 'email',
    Phone = 'phone'
}


export default class UserController extends Controller {
    public async isLogin(){
        const { ctx } = this;
       
        /*
        const user = ctx.session.user;
        if(user){
            ctx.success(user);
        }else{
            ctx.error(400, '还没有登录');
        }
         */
       // const {token} = ctx.query;
       //console.log("query:",token)
        //从header中获取token
        const token = ctx.get("authorization");
      
        try {
            // 第一个参数: 需要校验的token
            // 第二个参数: 当初加密的密钥
           const user =  jwt.verify(token, this.config.keys)
            ctx.success(user);
        }catch (e) {
            ctx.error(400, e.message);
        }
    }
    public async index(){
        const { ctx } = this;
        try {
            // 1.校验数据和验证码
            this.validateUserInfo();
            const data = ctx.request.body;
            ctx.helper.verifyImageCode(data.captcha);
            // 2.将校验通过的数据保存到数据库中
            const user = await ctx.service.user.getUser(data);
            //把用户保存到session中，在auth.ts权限判断中会用
            ctx.session.user = user;
            
            delete user.password;

            // 校验用户是否可用
            if(!user.userState){
                return ctx.error(400, '用户已经注销');
            }
            
            //把登陆状态保存到session中
           // ctx.session.user = user;
           // 把登陆状态保存到jwt
            // 3.生成JWT令牌
            // 第一个参数: 需要保存的数据
            // 第二个参数: 签名使用的密钥
            // 第三个参数: 额外配置
           // const token = jwt.sign(user, this.config.keys, {expiresIn: '7 days'});
            
           //因为cookie保存的空间有限，所以只保存几个关键值就可以
           const obj:any = {};
           obj.username = user.username;
           obj.email = user.email;
           obj.phone = user.phone;
           const token = jwt.sign(obj, this.config.keys, {expiresIn: '7 days'});


            console.log(user);
            console.log("jwt token:",token);

           // user.token = token;
  
            ctx.cookies.set('token', token, {
                 path:'/',
                 maxAge: 24 * 60 * 60 * 1000,
                 // 注意点: 如果httpOnly: true, 那么前端是无法获取这个cookie
                 httpOnly: false,
             });

            ctx.success(user);
        }catch (e) {
            if(e.errors){
                ctx.error(400, e.errors);
            }else{
                ctx.error(400, e.message);
            }
        }
    }


    public async create() {
        const { ctx } = this;
         
        try {
             // 1.校验数据和验证码
             this.validateUserInfo();
             this.validateUserCode();
           
             // 2.将校验通过的数据保存到数据库中
            const data = await ctx.service.user.createUser(ctx.request.body);
            
            
            ctx.success(data)
            
        }catch (e) {
            if(e.errors){
                // ctx.body = e.errors;
                ctx.error(400,e.errors);
                 
            }else{
                // ctx.body = e.message;
                ctx.error(400,e.message);
            }
        }
    }
    private validateUserCode(){
        const { ctx } = this;
        const data = ctx.request.body;
        const type = data.type;
        switch (type) {
            case TypeEnum.Normal:
                // 校验当前的验证码是否正确
                ctx.helper.verifyImageCode(data.captcha);
                break;
            case TypeEnum.Email:
                ctx.helper.verifyEmailCode(data.captcha);
                break;
            case TypeEnum.Phone:
                ctx.helper.verifySmsCode(data.captcha);
                break;
            default:
                throw new Error('注册类型不存在');
        }
    }

    private validateUserInfo(){
        const {ctx} = this;
        const data = ctx.request.body;
        const type = data.type;
        switch(type){
            case TypeEnum.Normal:
                 // 校验数据的格式是否正确
                ctx.validate(NormalUserRule, data);
                 
                break;
            case TypeEnum.Email:
                ctx.validate(EmailUserRule, data);
               
                break;
            case TypeEnum.Phone:
                ctx.validate(PhoneUserRule, data);
                 
                break;
            default:
                throw new Error('注册类型不存在');
        }
    }
}
