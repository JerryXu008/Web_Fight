import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

   // 自定义校验规则
  // app.validator.addRule('myUserName', (_rule, value:string) => {
  //   if(value.length < 6){
  //     return '用户名至少是6位'
  //   }
  // });

  
  // router.get('/', controller.home.index);
  // // 生成图形验证码
  // router.get('/imagecode', controller.util.imageCode);
  // // 生成邮件验证码
  // router.get('/emailcode', controller.util.emailCode);

  // router.get('/smscode', controller.util.smsCode);
  

  // router.post('/register', controller.user.create);

  // router.post('/login', controller.user.index);
  // router.get('/islogin', controller.user.isLogin);
  // router.get('/users', controller.users.index);

   
  // //借助egg-passport实现第三方登陆
  // const github = (app as any).passport.authenticate('github', {
  //   successRedirect: 'http://127.0.0.1:8082/admin'
  // });
  // router.get('/passport/github', github);
  // router.get('/passport/github/callback', github);
  
  //自己写第三方登陆逻辑的时候，设置的路由地址
  // router.get('/github', controller.github.getLoginView);
  // router.get('/github/callback', controller.github.getAccessToken);

   
  //把对应模块的路由封装到不同的文件中
  require('./router/code')(app);
  require('./router/account')(app);
  require('./router/users')(app);
  
  require('./router/userRole')(app);

   //角色权限
  require('./router/roleRights')(app);

  router.resources('roles', '/api/v1/roles/', controller.roles)

  router.resources('rights', '/api/v1/rights/', controller.rights);





};
