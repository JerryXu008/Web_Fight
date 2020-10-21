import { Controller } from 'egg';
export default class UserRoleController extends Controller {
    public async create() {
        const {ctx} = this;
        const data = ctx.request.body;
        try {
            console.log("<<<<<<<<<<<<<<<<",data);
            const user = await ctx.service.userRole.createUserRole(data);
            ctx.success(user);
        } catch (e) {
            ctx.error(400, e.message);
        }
    }
    public async destroy(){
        const {ctx} = this;
        const {userId} = ctx.params;
        const {roleId} = ctx.request.body;
        //console.log("嘻嘻嘻嘻嘻嘻嘻休息嘻嘻",userId,roleId)

        try {
            await ctx.service.userRole.destroyUserRole(userId, roleId);
            ctx.success();
        } catch (e) {
             
            ctx.error(400, e.message);
        }
    }

}
