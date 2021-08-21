import 'egg';
import ExtendIHelper from '../app/extend/helper';
type ExtendIHelperType = typeof ExtendIHelper;
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
  interface Context {
    helper: {
      getToken: (ctx: Context) => string | undefined;
      readFile: (filePath: string) => Promise<unknown>;
      writeFile: (filePath: any, fileData: any) => Promise<unknown>;
      handleBills: (
        MonthBills: BillsData.record[],
        mode?: 'MM-DD' | 'YYYY-MM'
      ) => any[];
    };
  }
}
