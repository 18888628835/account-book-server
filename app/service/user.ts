/*
 * @Author: 邱彦兮
 * @Date: 2021-10-04 17:42:10
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-02-02 19:56:16
 * @FilePath: /account-book-server/app/service/user.ts
 */
import { Service } from 'egg';

export default class User extends Service {
  /**
   * 注册新用户
   * @returns 新注册的用户信息
   */
  public async register() {
    const { ctx } = this;
    const user = await ctx.model.User.create(ctx.request.body);
    return user.toJSON();
  }
  /**
   * 根据用户手机号获取用户信息，登录时用
   * @returns 用户信息或者 null
   */
  public async getUserInfoByPhone(phone) {
    const { ctx } = this;

    const userInfo = await ctx.model.User.findOne({
      where: { phone },
    });
    return userInfo;
  }
  /**
   * 授权token 签名
   * @param userInfo 用户信息
   * @returns token
   */
  public async signToken(userInfo) {
    const { app } = this;
    const token = app.jwt.sign(
      {
        id: userInfo.id,
        userName: userInfo.userName,
        exp: Math.floor(Date.now() / 1000) + this.config.expires,
      },
      app.config.jwt.secret
    );
    return token;
  }
  /**
   * 根据token 获取用户信息
   * @param id 用户 id
   * @returns 用户信息或者 null
   */
  public async getUserInfoByToken() {
    const { ctx, app } = this;
    const token = ctx.helper.getToken(ctx);
    //token 解码
    const info = await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
    const userInfo = await app.model.User.findOne({
      where: { id: info.id },
    });
    return userInfo;
  }
  /**
   * 根据用户 id 修改信息
   * @param id 用户 id
   * @returns [0]或者[1]
   */
  public async editUserInfoById(id: number) {
    const { ctx } = this;
    const result = await ctx.model.User.update(
      { ...ctx.request.body },
      {
        where: { id },
      }
    );
    return result;
  }
  /**
   *
   * @param id 用户 id
   * @param date 前端传入的时间
   * @returns 增加的信息
   */
  public async clockInById(id: number, date: Date) {
    const { ctx } = this;
    const result = await ctx.model.ClockIn.create({
      userId: id,
      date: date || Date.now(),
    });
    return result;
  }
  public async getClockInTimesById(userId: number) {
    const { ctx } = this;
    const result = await ctx.model.ClockIn.findAll({
      where: { userId },
      order: [['date', 'DESC']],
    });
    return result;
  }
}
