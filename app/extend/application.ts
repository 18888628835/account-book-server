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
};
