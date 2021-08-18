import { Service } from 'egg';

/**
 * Test Service
 */
export default class User extends Service {
  /**
   * 用户注册
   * @returns 新注册的用户信息
   */
  public async register() {
    const { ctx } = this;
    const user = await ctx.model.User.create(ctx.request.body);
    return user.toJSON();
  }
}
