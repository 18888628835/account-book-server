import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.post('/api/user/register', controller.user.register);
};
