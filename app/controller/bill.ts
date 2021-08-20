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
    const userInfo = await ctx.service.user.getUserInfoByToken();
    const userBills = await ctx.service.bill.getUserBillsById(userInfo.id);

    throw app.Success('ok', userBills);
  }
  // 获取月份账单数据
  public async getBillsForMonth() {
    const { ctx, app } = this;
    const { month } = ctx.request.query;

    const userInfo = await ctx.service.user.getUserInfoByToken();
    const monthBills = await ctx.service.bill.getBillsByMonth(
      userInfo.id,
      month
    );

    throw app.Success('ok', monthBills);
  }
}
