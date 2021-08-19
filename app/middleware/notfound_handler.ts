import { HttpException } from '../extend/application';

export default () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = new HttpException('Not Found', 404);
      } else {
        ctx.body = '<h1>Not Found</h1>';
      }
    }
  };
};
