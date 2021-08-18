import { Controller } from 'egg';

export default class UserController extends Controller {
  public async register() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.register('注册');
  }
}
