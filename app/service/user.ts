import { Service } from 'egg';

/**
 * Test Service
 */
export default class User extends Service {
  /**
   * 新注册用户
   * @returns 新注册的用户信息
   */
  public async register() {
    const { ctx } = this;
    const user = await ctx.model.User.create(ctx.request.body);
    return user.toJSON();
  }
  /**
   * 根据用户手机号获取用户信息，登录时用
   * @returns 用户信息或者 null
   */
  public async getUserInfoByPhone() {
    const { ctx } = this;
    const userInfo = await ctx.model.User.findOne({
      where: { phone: ctx.request.body.phone },
    });
    return userInfo;
  }
  /**
   *
   * @param id 用户 id
   * @returns 用户信息或者 null
   */
  public async getUserInfoByToken() {
    const { ctx, app } = this;
    const token = ctx.helper.getToken(ctx);
    const info = await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
    const userInfo = await app.model.User.findOne({
      where: { id: info.id },
    });
    return userInfo;
  }
}
