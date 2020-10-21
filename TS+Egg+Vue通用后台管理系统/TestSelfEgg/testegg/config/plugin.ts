import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  // 开启sequelize-typescript
  // sequelize : {
  //   enable: true,
  //   package: 'egg-sequelize',
  // }
  sequelize : {
    enable: true,
    package: 'egg-sequelize-ts',
  },
  // 开启前端数据校验
  validate : {
    enable: true,
    package: 'egg-validate',
},
// 开启Redis存储
sessionRedis : {
  enable: true,
  package: 'egg-session-redis',
},
redis : {
  enable: true,
  package: 'egg-redis',
},
// 开启跨域插件
cors : {
  enable: true,
  package: 'egg-cors',
 },
 //开启插件三方鉴权登陆
// config/plugin.js
passport : {
  enable: true,
  package: 'egg-passport',
},
passportGithub : {
  enable: true,
  package: 'egg-passport-github',
 }
};

export default plugin;
