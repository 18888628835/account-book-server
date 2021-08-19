import { Service } from 'egg';

export default class Bill extends Service {
  /**
   *
   * @param id 用户 id
   * @returns  添加的用户信息
   */
  public async addBillById(id: number) {
    const { ctx, app } = this;
    const result = await app.model.Bill.create({
      ...ctx.request.body,
      userId: id,
    });
    return result;
  }
}
