import { Application } from 'egg';

export default (app: Application) => {
  const {
    controller: { user, upload, bill },
    router,
    middleware,
  } = app;
  const validateToken = middleware.validateToken();
  router.post('/api/user/login', user.login);
  router.get('/api/user/getUserInfo', validateToken, user.getUserInfo);
  router.put('/api/user/editUserInfo', validateToken, user.editUserInfo);
  router.post('/api/user/upload', upload.uploadFiles);
  router.post('/api/bill/add', validateToken, bill.add);
};
