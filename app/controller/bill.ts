import { Controller } from 'egg';
import { outlayList } from '../mock/typeIcon';
export default class BillController extends Controller {
  /**
   * 添加账单
   */
  public async add() {
    const { ctx, app } = this;
    const { payType, typeName } = ctx.request.body;
    if (typeName === '') {
      throw app.HttpException('请选择标签', 400);
    }
    if (payType !== 1 && payType !== 2) {
      throw app.HttpException('账单类型不正确', 400);
    }
    const userInfo = await ctx.service.user.getUserInfoByToken();
    await ctx.service.bill.addBillById(userInfo.id);

    throw app.Success('ok');
  }
  /**
   * 获取用户所有账单
   */
  public async getUserBills() {
    const { ctx, app } = this;
    const userBills = await ctx.service.bill.getUserBillsByToken();
    throw app.Success('ok', userBills);
  }
  /**
   * 获取指定月份中每一天的账单数据 还有收入-支出总和
   */
  public async getDailyBillsByMonth() {
    const { ctx, app } = this;
    const { month } = ctx.request.query;
    const userInfo = await ctx.service.user.getUserInfoByToken();
    const monthBills = await ctx.service.bill.getBillsByMonth(
      userInfo.id,
      month
    );
    const result = ctx.helper.handleBills(monthBills);
    const total = ctx.helper.getAllIncomeByMonth(result);
    throw app.Success('ok', { ...total, list: result });
  }
  /**
   * 返回用户每年每月的账单数据
   */
  public async getMonthlyBillsByYear() {
    const { ctx, app } = this;
    const { year } = ctx.request.query;
    const userInfo = await ctx.service.user.getUserInfoByToken();
    const yearBills = await ctx.service.bill.getBillsByYear(userInfo.id, year);
    const result = ctx.helper.handleBills(yearBills, 'YYYY-MM');
    const total = ctx.helper.getAllIncomeByMonth(result);
    throw app.Success('ok', { ...total, list: result });
  }
  /**
   * 返回用户每年每月或者每月每日的账单数据
   * @params year=2021 mont=2021-2
   */
  public async getBillsByDate() {
    const { ctx, app } = this;
    const { year, month } = ctx.request.query;
    type TimeMode = 'month' | 'year';
    type Mode = 'MM-DD' | 'YYYY-MM';
    let timeMode: TimeMode = month ? 'month' : 'year';
    let mode: Mode = month ? 'MM-DD' : 'YYYY-MM';

    const userInfo = await ctx.service.user.getUserInfoByToken();
    const bills = await ctx.service.bill.getBillsByDate(
      userInfo.id,
      month || year,
      timeMode
    );

    const result = ctx.helper.handleBillsClassificatory(bills, mode);
    const total = ctx.helper.getTotal(result);
    throw app.Success('ok', { ...total, list: result });
  }
  /**
   * 修改账单
   */
  public async updateBill() {
    const { ctx, app } = this;
    const { id, ...rest } = ctx.request.body;
    if (!id) {
      throw app.HttpException('id不存在', 400);
    }
    if (rest.payType && rest.payType !== 1 && rest.payType !== 2) {
      throw app.HttpException('账单类型不正确', 400);
    }

    const result = await ctx.service.bill.updateBillById();
    if (result[0]) {
      throw app.Success();
    }
  }
  public async getTop5StatisticsById() {
    const { ctx, app } = this;
    const userInfo = await ctx.service.user.getUserInfoByToken();
    /**
     * 根据 id 查询用户消费金额在前5位的消费种类
     */
    const [statistics, _] = await ctx.service.bill.getTop5StatisticsById(
      userInfo.id
    );
    /**
     * 查询用户所有账单金额的总额
     */
    const amount = await app.model.Bill.sum('amount', {
      where: {
        userId: userInfo.id,
        payType: 1,
        deleteFlag: 0,
      },
    });
    // 计算用户消费金额前5位金额总额
    const statisticsAmount = statistics.reduce(
      (previousValue, currentValue) => currentValue.count + previousValue,
      0
    );
    // 返回用户消费金额前五位的种类名和占比
    let statisticsWithName = statistics.map(item => {
      const tag = outlayList.find(
        listItem => item.type_name === listItem.typeName
      );
      return {
        name: tag?.tagName,
        value: Math.round((item.count / amount) * 100),
      };
    });
    //其他消费
    const exception = {
      name: '其他',
      value: Math.round(((amount - statisticsAmount) / amount) * 100),
    };
    statisticsWithName.push(exception);
    throw app.Success('ok', statisticsWithName);
  }
}
