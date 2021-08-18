import { Context } from 'egg';

module.exports = {
  getToken(ctx: Context): string | undefined {
    const authorization = ctx.request.header?.authorization as string;
    if (authorization) {
      let [_, token] = authorization.split(' ');
      return token;
    }
    return undefined;
  },
};
