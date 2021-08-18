import { HttpException } from '../extend/application';

export default () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.status = 404;
        ctx.body = new HttpException('Not Found', 404);
      } else {
        ctx.body = '<h1>Page Not Found</h1>';
      }
    }
  };
};
