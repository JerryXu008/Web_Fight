import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1601358956182_5964';
  //设置超时时间
  config.serverTimeout = 20000;


  // add your egg config in here
  // add your egg config in here
  //auth 权限控制的中间件
  config.middleware = ['auth'];
  config.auth = {
    authUrls: [
       // '/users'
    ]
  };



  // 跨域相关配置
  config.cors = {
    origin: 'http://127.0.0.1:8082', // 允许哪个地址跨域请求
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH', // 允许哪些方法跨域请求
    credentials: true // 允许前端携带cookie
  };

    // 文件上传相关配置
   config.multipart = {
      mode: 'file',
      fileSize: '10mb',
      fileExtensions:['.xls']
    };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  //配置三方鉴权登陆
  // config/default.js
config.passportGithub = {
  key: '096ef1e42e2325a6ba75',
  secret: '3f56998517446b45f5b5e75142f61dd846b1810a',
  // callbackURL: '/passport/github/callback',
  // proxy: false,
};


  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
