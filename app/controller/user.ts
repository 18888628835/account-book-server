import { Controller } from 'egg';
import moment = require('moment');

export default class UserController extends Controller {
  /**
   * 登录/注册登录
   */
  public async login() {
    const { ctx, app } = this;
    const userInfo = await ctx.service.user.getUserInfoByPhone();

    if (userInfo?.id) {
      // 用户存在走登录逻辑
      if (ctx.request.body.password !== userInfo.password) {
        throw app.HttpException('密码错误', 403);
      }
      const token = await ctx.service.user.signToken(userInfo);
      throw app.Success('登录成功', { token });
    }
    //用户不存在走注册逻辑
    const registeredUser = await ctx.service.user.register();
    if (registeredUser.id) {
      const token = await ctx.service.user.signToken(registeredUser);
      throw app.Success('注册并登录成功', { token });
    }
  }
  /**
   * 获取用户信息
   */
  public async getUserInfo() {
    const { ctx } = this;
    const userInfo = await ctx.service.user.getUserInfoByToken();
    const clockInInfo = await ctx.service.user.getClockInTimesById(userInfo.id);
    let todayClockIn = false;

    function getToday(time) {
      return moment(time).format('YYYY-MM-DD');
    }

    if (getToday(clockInInfo[0]?.date) === getToday(Date.now())) {
      todayClockIn = true;
    }
    throw ctx.app.Success('ok', {
      ...userInfo.toJSON(),
      clockInTimes: clockInInfo.length,
      todayClockIn,
    });
  }
  /**
   * 修改用户信息：头像、用户名、个性签名等
   */
  public async editUserInfo() {
    const { ctx, app } = this;
    const userInfo = await ctx.service.user.getUserInfoByToken();
    const result = await ctx.service.user.editUserInfoById(userInfo.id);
    if (result[0]) {
      throw app.Success('修改成功', true);
    }
    throw app.HttpException('参数不正确,信息未修改成功', 400);
  }
  /**
   * 打卡
   */
  public async clockIn() {
    const { ctx } = this;
    const { date } = ctx.request.body;
    const userInfo = await ctx.service.user.getUserInfoByToken();
    const result = await ctx.service.user.clockInById(userInfo.id, date);

    if (result.id) {
      const clockInTimes = await ctx.service.user.getClockInTimesById(
        userInfo.id
      );
      throw ctx.app.Success('ok', { clockInTimes });
    }
  }
}
