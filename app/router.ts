import { Application } from 'egg';

export default (app: Application) => {
  const {
    controller: { user },
    router,
    middleware,
  } = app;
  const validateToken = middleware.validateToken();
  router.post('/api/user/login', user.login);
  router.get('/api/user/getUserInfo', validateToken, user.getUserInfo);
  router.post('/api/user/editUserInfo', validateToken, user.editUserInfo);
};
