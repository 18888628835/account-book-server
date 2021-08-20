import { Service } from 'egg';
import moment = require('moment');

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
  /**
   *
   * @param id 用户 id
   * @returns  用户所有账单
   */
  public async getUserBillsById(id: number) {
    const { app } = this;
    const bills = await app.model.Bill.findAll({
      where: {
        userId: id,
      },
    });
    return bills;
  }
  /**
   *
   * @param id 用户 id
   * @param month 想要查询的月份 示例:2020-8
   */
  public async getBillsByMonth(id: number, month: string) {
    const { app } = this;
    const { Op } = app.Sequelize;
    // 获取当月第一天时间,需要以 string+格式的方式被 moment 创建
    let firstDay = moment(month, 'YYYY-MM').startOf('month').format();
    //获取当月最后一天时间
    let lastDay = moment(month, 'YYYY-MM').endOf('month').format();
    //获取用户传入月份第一天到最后一天的数据
    const result = app.model.Bill.findAll({
      where: { userId: id, date: { [Op.between]: [firstDay, lastDay] } },
      order: ['date'],
    });
    return result;
  }
}
