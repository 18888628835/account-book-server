import { Service } from 'egg';

export default class Bill extends Service {
  /**
   *
   * @param id 用户 id
   * @returns  添加的用户信息
   */
  public async addBillById(id: number) {
    const { ctx, app } = this;
    const { date, ...restFields } = ctx.request.body;
    const result = await app.model.Bill.create({
      ...restFields,
      date: date || Date.now(),
      userId: id,
    });
    return result;
  }
  public async getUserBillsById(id: number) {
    const { app } = this;
    const bills = await app.model.Bill.findAll({
      where: {
        userId: id,
      },
    });
    return bills;
  }
}
