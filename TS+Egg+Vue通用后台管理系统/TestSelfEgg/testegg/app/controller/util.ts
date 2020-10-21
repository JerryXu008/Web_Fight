import { Controller } from 'egg';
 

export default class UtilController extends Controller {
    //图形验证码
    public async imageCode() {
        const { ctx } = this;
        ctx.response.type='image/svg+xml';
        ctx.body = ctx.helper.createImageCode();
    }
    //邮箱验证码
    public async emailCode(){
        const {ctx} = this;
        try {
            const {email} = ctx.query;
            const data = await ctx.helper.sendEmailCode(email);
            ctx.success(data);
        }catch (e) {
            console.log("ccccccccc：",e)
            ctx.error(400, e.message);
        }
    }
     //手机验证码
     public async smsCode(){
        const {ctx} = this;
        try {
            const {phone} = ctx.query;
            const data = await ctx.helper.sendSmsCode(phone);
            ctx.success(data);
        }catch (e) {
            ctx.error(400, e.message);
        }
    }


}
