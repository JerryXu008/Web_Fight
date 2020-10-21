import { Service } from 'egg';


export default class UserRole extends Service {

    public async createUserRole(obj) {
        try {
            console.log("呵呵呵呵呵呵呵",this.ctx.model.UserRole)
           // console.log("嘻嘻嘻嘻嘻嘻嘻嘻",this.ctx.model.UserRole.create)
            const data = await this.ctx.model.UserRole.create(obj);
            const userRoleData = data['dataValues'];
            return userRoleData;
        }catch (e) {
            console.log(">>>>>>>>>>>>",e)
            throw new Error('分配角色失败');
        }
    }

    public async destroyUserRole(userId, roleId){
        
        try {
            
            const data = await this.ctx.model.UserRole.destroy({
                where:{userId:userId, roleId: roleId}
            });
            if(data <= 0){
               
                throw new Error('删除角色失败');
            }
        }catch (e) {
            console.log("删除角色失败",e);
            throw new Error('删除角色失败');
        }
    }

}
