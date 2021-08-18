import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/api/user/register', controller.user.register);
};
