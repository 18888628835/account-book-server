import 'egg';

declare module 'egg' {
  interface Application {
    jwt: {
      sign(
        payload: any,
        secret: string,
        options?: any,
        callback?: function
      ): string;
      verify(
        token: any,
        secret: string,
        options?: any,
        callback?: function
      ): any;
    };
  }
}
