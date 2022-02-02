import { Service } from 'egg';
import { outlayList, incomeList } from '../mock/typeIcon';
import moment = require('moment');

export default class Bill extends Service {
  /**
   *
   * @param id 用户 id
   * @returns  添加的用户信息
   */
  public async addBillById(id: number) {
    const { ctx, app } = this;
    const { date, remark, typeName, ...restFields } = ctx.request.body;
    const result = await app.model.Bill.create({
      ...restFields,
      typeName,
      remark: remark
        ? remark
        : [...outlayList, ...incomeList].find(
            item => item.typeName === typeName
          )?.tagName,
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
  public async getUserBillsByToken() {
    const { ctx, app } = this;
    const userInfo = await ctx.service.user.getUserInfoByToken();
    const bills = await app.model.Bill.findAll({
      where: {
        userId: userInfo.id,
      },
      order: [['date', 'DESC']],
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
  /**
   *
   * @param id 用户 id
   * @param month 想要查询的年份 示例:2020
   */
  public async getBillsByYear(id: number, year: string) {
    const { app } = this;
    const { Op } = app.Sequelize;
    // 获取当年第一天时间,需要以 string+格式的方式被 moment 创建
    let firstDay = moment(year, 'YYYY-MM').startOf('year').format();
    //获取当年最后一天时间
    let lastDay = moment(year, 'YYYY-MM').endOf('year').format();
    //获取用户传入年份第一天到最后一天的数据
    const result = app.model.Bill.findAll({
      where: { userId: id, date: { [Op.between]: [firstDay, lastDay] } },
      order: ['date'],
    });
    return result;
  }
  /**
   *
   * @param id 用户 id
   * @param timeString 想要查询的月份或年份 示例:2020 2020-8
   * @param mode year 或者 month
   */
  public async getBillsByDate(
    id: number,
    timeString: string,
    mode: 'year' | 'month'
  ): Promise<BillsData.Bills[]> {
    const { app } = this;
    const { Op } = app.Sequelize;
    // 获取当年或当月第一天时间,需要以 string+格式的方式被 moment 创建
    let firstDay = moment(timeString, 'YYYY-MM').startOf(mode).format();
    //获取当年或当月最后一天时间
    let lastDay = moment(timeString, 'YYYY-MM').endOf(mode).format();
    //获取用户传入年份或月份第一天到最后一天的数据
    const result = app.model.Bill.findAll({
      where: {
        userId: id,
        deleteFlag: false,
        date: { [Op.between]: [firstDay, lastDay] },
      },
      order: [['date', 'DESC']],
    });
    return result;
  }
  /**
   * 通过 id 修改对应账单的信息
   * @returns 修改成功[1] 修改失败[0]
   */
  public async updateBillById() {
    const { ctx, app } = this;
    const { id, ...rest } = ctx.request.body;
    let args = { ...rest };

    if (rest.remark === '') {
      let bill = await app.model.Bill.findOne({ where: { id } });
      console.log('🚀🚀🚀🚀🚀 - bill', bill);

      args = {
        ...rest,
        remark: [...outlayList, ...incomeList].find(
          item => item.typeName === bill.toJSON().typeName
        )?.tagName,
      };
    }
    const result = await app.model.Bill.update(args, { where: { id } });
    return result;
  }
  /**
   *
   * @param id 用户 id
   * @returns  用户消费金额在前五位的消费种类
   */
  public async getTop5StatisticsById(id) {
    const { app } = this;
    const groupData: [any, any] = await app.model.query(
      `SELECT type_name,SUM(amount + 0) as count FROM bills  WHERE user_id=${id} AND pay_type =1 AND delete_flag=0 GROUP BY type_name ORDER BY count DESC LIMIT 0,5;`
    );
    return groupData;
  }
}
