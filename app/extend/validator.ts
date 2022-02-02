/*
 * @Author: 邱彦兮
 * @Date: 2022-02-02 18:08:54
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-02-02 19:53:06
 * @FilePath: /account-book-server/app/extend/validator.ts
 */
var strategies = {
  notEmpty: function (value, errorMsg) {
    // 不能为空
    if (value === '') {
      return errorMsg;
    }
  },
  minLength: function (value, length, errorMsg) {
    // 限制最小长度
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function (value, errorMsg) {
    // 手机号码格式
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  },
};
class Validator {
  static add(rules, data) {
    let result;
    for (let rule of rules) {
      let { target, rule: ruleName, args = [], message: errorMsg } = rule;
      result = strategies[ruleName](target, ...args, errorMsg);
      if (typeof result === 'string') {
        return result;
      }
    }
  }
}

export default Validator;
