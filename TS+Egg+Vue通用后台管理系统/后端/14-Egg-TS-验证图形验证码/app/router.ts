import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/captcha', controller.util.imageCode);
  router.get('/verify', controller.util.verifyImageCode);

  router.post('/register', controller.user.create);
};
