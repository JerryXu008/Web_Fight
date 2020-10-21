import { Service } from 'egg';
const { Op } = require("sequelize");
import {Rights} from '../model/rights';
/**
 * Test Service
 */
export default class Roles extends Service {

    public async getAllRoles(){
        const roles = await this.ctx.model.Role.findAll();
        return roles;
    }
    
    /**
     * sayHi to you
     * @param name - your name
     */
    public async getRolesList(obj) {
        const currentPage = parseInt(obj.currentPage) || 1;
        const pageSize = parseInt(obj.pageSize) || 5;
        const {key} = obj;
        if(key){
            const roles = await this.ctx.model.Role.findAll({
                attributes:{
                    exclude:['password', 'created_at', 'updated_at']
                },
                limit: pageSize,
                offset: (currentPage - 1) * pageSize,
                where: {
                    [Op.or]:[
                        {roleName:{[Op.substring]: key}},
                        {roleDesc:{[Op.substring]: key}},
                    ]
                },
                include:[
                    {model:Rights}
                ]
            });
            
           
            
            const totalCount = await this.ctx.model.Role.findAndCountAll({
                where: {
                    [Op.or]:[
                        {roleName:{[Op.substring]: key}},
                        {roleDesc:{[Op.substring]: key}},
                    ]
                }
            });
            return {roles:roles, totalCount:totalCount.count};
        }else{
            const users = await this.ctx.model.Role.findAll({
                limit: pageSize,
                offset: (currentPage - 1) * pageSize,
                include:[
                    {model:Rights}
                ]
            });
            //console.log("角色列表返回值>>>>>>>>>>>:",users)
            const totalCount = await this.ctx.model.Role.findAndCountAll();
            // //测试一下。。。。。。。
            // let newUsers:any[]=[];
            // users.forEach( (element) => {
            //     let e = element
            //     newUsers.push((e as any)['dataValues']);
            // });
             let newUsers = users;

            return {roles:newUsers, totalCount:totalCount.count};
        }
    }
    public async createRole(obj){
        const data = await this.ctx.model.Role.create(obj);
        const roleData = data['dataValues'];
        return roleData;
    }
    public async destroyRole(id){
        const role = await this.ctx.model.Role.findByPk(id);
        if(role){
            const data = await this.ctx.model.Role.destroy({
                where:{id:id}
            });
            if(data > 0){
                return role;
            }else{
                throw new Error('删除角色失败');
            }
        }else{
            throw new Error('删除的角色不存在');
        }
    }
    public async updateRole(id, obj){
        const role = await this.ctx.model.Role.findByPk(id);
        if(role){
            const data = await this.ctx.model.Role.update(obj, {
                where:{
                    id:id
                }
            });
            if(data.length > 0){
                return role;
            }else{
                throw new Error('更新角色失败');
            }
        }else{
            throw new Error('更新的角色不存在');
        }
    }
}
