import { HttpException } from '../extend/application';
export default () => {
  return async function catchError(ctx, next) {
    try {
      await next();
    } catch (error) {
      const requestUrl = `${ctx.method} ${ctx.path}`;
      if (error instanceof HttpException) {
        //手动抛出错误
        error.requestUrl = requestUrl;
        ctx.status = error.code;
        ctx.body = { ...error };
      } else if (error.status === 422) {
        console.log(error);
        //参数校验错误
        ctx.status = 422;
        ctx.body = {
          ...new HttpException(error.errors[0].message, 422, requestUrl),
        };
      } else {
        // 未知错误
        console.log(error);
        ctx.status = 500;
        ctx.body = new HttpException(
          error.message || '未知异常',
          999,
          requestUrl
        );
      }
    }
  };
};
