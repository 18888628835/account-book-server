import { Controller } from 'egg';
import { outlayList, incomeList } from '../mock/typeIcon';
export default class TypeController extends Controller {
  /**
   * 获取用户列表
   */
  public getIconList() {
    const { app } = this;
    throw app.Success('ok', { incomeList, outlayList });
  }
}
