import { Controller } from 'egg';
export default class UserController extends Controller {
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

    const result = await ctx.service.user.register();
    if (result.id) {
      throw app.Success();
    }
  }
}
