import { Controller } from 'egg';

export default class UserController extends Controller {
  /**
   * 注册用户
   */
  public async register() {
    const { ctx, app } = this;
    const { phone, password } = ctx.request.body;

    await ctx.validate(
      {
        phone: {
          required: true,
          type: 'string',
          max: 11,
          min: 11,
          format: /^1\d{10}/g,
        },
        password: {
          type: 'string',
          required: true,
          max: 12,
          min: 6,
        },
      },
      { phone, password }
    );
    const userInfo = await ctx.service.user.getUserInfoByPhone();
    if (userInfo.id) {
      throw app.HttpException('手机号码已存在', 200);
    }
    const result = await ctx.service.user.register();
    if (result.id) {
      throw app.Success();
    }
  }
  public async getToken() {}
  /**
   * 登录
   */
  public async login() {
    const { ctx, app } = this;
    const userInfo = await ctx.service.user.getUserInfoByPhone();
    if (userInfo.id) {
      if (ctx.request.body.password !== userInfo.password) {
        throw app.HttpException('密码错误', 403);
      }
      //给 token
      const token = app.jwt.sign(
        {
          id: userInfo.id,
          userName: userInfo.userName,
          exp: Math.floor(Date.now() / 1000) + this.config.expires,
        },
        app.config.jwt.secret
      );
      throw app.Success('登录成功', token);
    } else {
      throw app.HttpException('用户并不存在', 401);
    }
  }
}
