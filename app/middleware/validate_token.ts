import { Context } from 'egg';

export default () => {
  return async function validateToken(ctx: Context, next: () => Promise<any>) {
    const token = ctx.helper.getToken(ctx);
    if (!token) {
      throw ctx.app.HttpException('请先登录', 403);
    }
    try {
      ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
      await next();
    } catch (error: any) {
      throw error.message === 'jwt expired'
        ? ctx.app.HttpException('token 已过期，请重新登录', 403)
        : error;
    }
  };
};
