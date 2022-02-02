/*
 * @Author: 邱彦兮
 * @Date: 2021-10-04 17:42:10
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-02-02 18:27:24
 * @FilePath: /account-book-server/app/extend/application.ts
 */
import Validator from './validator';
export class HttpException extends Error {
  success: boolean;
  data: any;
  constructor(
    public msg: string,
    public code: number,
    public requestUrl?: string
  ) {
    super();
    this.success = false;
    this.data = null;
  }
}
export class Success extends HttpException {
  constructor(message, data) {
    super(message, 200);
    this.success = true;
    this.data = data;
  }
}

export default {
  HttpException(msg, code) {
    return new HttpException(msg, code);
  },

  Success(message = 'ok', data: any = true) {
    return new Success(message, data);
  },

  Validator,
};
