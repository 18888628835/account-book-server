import { Controller } from 'egg';

export default class BillController extends Controller {
  /**
   * 添加账单
   */
  public async add() {
    const { ctx, app } = this;
    const { payType } = ctx.request.body;

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
  public async getBills() {
    const { ctx, app } = this;
    const { year, month } = ctx.request.query;
    let timeMode: 'month' | 'year' = month ? 'month' : 'year';
    let mode: 'MM-DD' | 'YYYY-MM' = month ? 'MM-DD' : 'YYYY-MM';
    const userInfo = await ctx.service.user.getUserInfoByToken();
    const bills = await ctx.service.bill.getBills(
      userInfo.id,
      month || year,
      timeMode
    );

    const result = ctx.helper.handleBills(bills, mode);
    const total = ctx.helper.getTotalByTime(result);
    throw app.Success('ok', { ...total, list: result });
  }
}
