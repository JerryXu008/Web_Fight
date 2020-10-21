'use strict';

// module.exports = app => {
//     const { STRING, INTEGER, DATE } = app.Sequelize;

//     const User = app.model.define('user', {
//         id: { type: INTEGER, primaryKey: true, autoIncrement: true },
//         username: STRING(30),
         
//         created_at: DATE,
//         updated_at: DATE,
//     });
//     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.")
//     return User; 
// };





// 需要安装 sequelize-typescript 和 egg-sequelize-ts 
/**
 * @desc 用户表
 */
//import { Column, DataType, Model, Table, CreatedAt, UpdatedAt} from 'sequelize-typescript';
// @Table({
//     modelName: 'user'
// })
// class User extends Model<User> {

//     @PrimaryKey
//     @AutoIncrement
//     @Column({
//         type: DataType.INTEGER,
//         comment: '用户ID',
//     })
//     id: number;

//     @Column({
//         type: DataType.STRING,
//         comment: '用户姓名',
//     })
//     username: string;

    

//     @Column({
//         field: 'created_at'
//     })
//     createdAt: Date;

//     @Column({
//         field: 'updated_at'
//     })
//     updatedAt: Date;
// };
// export default () => User;

// @Table({
//     modelName: 'user'
// })
// export class User extends Model<User> {

//     @Column({
//         type: DataType.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         unique: true,
//         allowNull: false,
//         comment: '用户ID',
//     })
//     id: number;

//     @Column({
//         type:DataType.STRING(255),
//         allowNull:true,
//         unique:true,
//         comment: '用户姓名',
//         validate:{
//             is: /^[A-Za-z0-9]{6,}$/
//         }
//     })
//     username: string;

//     @Column({
//         type:DataType.STRING(255),
//         allowNull:true,
//         unique:true,
//         comment: '用户邮箱',
//         validate:{
//             isEmail:true
//         }
//     })
//     email: string;

//     @Column({
//         type:DataType.STRING(255),
//         allowNull:true,
//         unique:true,
//         comment: '用户手机',
//         validate:{
//             is:/^1[3456789]\d{9}$/
//         }
//     })
//     phone: string;

//     @Column({
//         type:DataType.STRING(255),
//         allowNull:false,
//         unique:true,
//         comment: '用户密码',
//     })
//     password: string;

//     @CreatedAt
//     createdAt: Date;

//     @UpdatedAt
//     updatedAt: Date;
// };
// export default () => User;



/**
 * @desc 用户表
 */
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, HasMany,BelongsToMany} from 'sequelize-typescript';
import {OAuth} from './oauth';
import {Role} from './role';
import {UserRole} from './userRole';
/*
1.按照sequelize-typescript官方给定的方式建立完表与表之间的关系之后, 编译报错
报错的原因是因为我们并没有直接使用sequelize-typescript, 而是借助了egg-sequelize-ts这个插件来使用sequelize-typescript
也正是因为如此, 所以问题的原因在于这个插件有问题
2.问题的原因
在egg-sequelize-ts插件中, 它是根据 "sequelize-typescript": "^0.6.6"版本来编写的
而在我们的项目中, 我们使用的sequelize-typescript的版本是 1.1.0
所以正是因为如此, 导致了不兼容问题
* */
@Table({
    modelName: 'user'
})
export class User extends Model<User> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        comment: '用户ID',
    })
    id: number;

    @Column({
        type:DataType.STRING(255),
        allowNull:true,
        unique:true,
        comment: '用户姓名',
        validate:{
            is: /^[A-Za-z0-9\-]{6,}$/
        }
    })
    username: string;

    @Column({
        type:DataType.STRING(255),
        allowNull:true,
        unique:true,
        comment: '用户邮箱',
        validate:{
            isEmail:true
        }
    })
    email: string;

    @Column({
        type:DataType.STRING(255),
        allowNull:true,
        unique:true,
        comment: '用户手机',
        validate:{
            is:/^1[3456789]\d{9}$/
        }
    })
    phone: string;

    @Column({
        type:DataType.STRING(255),
        allowNull:false,
        unique:true,
        comment: '用户密码',
    })
    password: string;

    @Column({
        type:DataType.BOOLEAN,
        allowNull:true,
        unique:false,
        comment: '是否绑定授权账户',
    })
    github:  boolean;


    @Column({
        field:'user_state',
        type:DataType.BOOLEAN,
        allowNull:true,
        unique:false,
        comment: '用户是否可用',
    })
    userState: boolean;

    @Column({
        field:'avatar_url',
        type:DataType.STRING,
        allowNull:true,
        unique:false,
        comment: '用户头像',
        // get() {
        //     const rawValue = this.getDataValue('avatarURL');
        //     return rawValue ? 'http://127.0.0.1:7001' + rawValue : null;
        // }
    })
    avatarURL: string;

    @Column({
        // 虚拟字段
        type: DataType.VIRTUAL,
        get(){
            return 'http://127.0.0.1:7001';
        }
    })
    baseURL: string;




    @HasMany(()=>OAuth)
    oauths:OAuth[];

    @BelongsToMany(()=>Role, ()=>UserRole)
    roles:Role[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
};
export default () => User;
