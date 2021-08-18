import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const validateToken = middleware.validateToken();
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get(
    '/api/user/getUserInfo',
    validateToken,
    controller.user.getUserInfo
  );
};
