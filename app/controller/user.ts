import { Controller } from 'egg';

export default class UserController extends Controller {
  /**
   * 登录/注册登录
   */
  public async login() {
    const { ctx, app } = this;
    const userInfo = await ctx.service.user.getUserInfoByPhone();

    if (userInfo?.id) {
      // 用户存在走登录逻辑
      if (ctx.request.body.password !== userInfo.password) {
        throw app.HttpException('密码错误', 403);
      }
      const token = await ctx.service.user.signToken(userInfo);
      throw app.Success('登录成功', { token });
    }
    //用户不存在走注册逻辑
    const registeredUser = await ctx.service.user.register();
    if (registeredUser.id) {
      const token = await ctx.service.user.signToken(registeredUser);
      throw app.Success('注册并登录成功', { token });
    }
  }
  /**
   * 获取用户信息
   */
  public async getUserInfo() {
    const { ctx } = this;
    const userInfo = await ctx.service.user.getUserInfoByToken();
    throw ctx.app.Success('ok', userInfo);
  }
}
