import { Context } from 'egg';
import * as fs from 'fs';
import { all, create } from 'mathjs';
import moment = require('moment');
const config = {
  number: 'BigNumber',
  precision: 20,
};
const math: any = create(all, config);

module.exports = {
  getToken(ctx: Context): string | undefined {
    const authorization = ctx.request.header?.authorization as string;

    let [_, token] = authorization.split(' ');
    if (token !== 'null') {
      return token;
    }
    return undefined;
  },
  readFile(filePath: string) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (error, buffer) => {
        if (error) {
          reject(error);
        }
        resolve(buffer);
      });
    });
  },
  writeFile(filePath, fileData) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, fileData, error => {
        if (error) {
          reject(error);
        } else {
          resolve(filePath);
        }
      });
    });
  },
  handleBillsClassificatory(
    billDetails: BillsData.Record[],
    mode: 'MM-DD' | 'YYYY-MM' = 'MM-DD'
  ): BillsData.Bills[] {
    const hashMap: Map<string, BillsData.Record[]> = new Map();
    //按照日期归类
    for (let item of billDetails) {
      let attr = moment(item.date).format(mode);
      if (hashMap.get(attr)) {
        hashMap.get(attr)!.push(item);
        continue;
      }
      hashMap.set(attr, [item]);
    }

    const bills: BillsData.Bills[] = [];
    hashMap.forEach((value, key) => {
      let temp: BillsData.Bills = { time: '', income: 0, outlay: 0, data: [] };
      //计算 支出和收入 1支出 2收入
      const total = value.reduce(
        (preTotal, cur) => {
          return cur.payType === 2
            ? {
                ...preTotal,
                income: Number(
                  math.evaluate(`${cur.amount}+${preTotal.income}`)
                ),
              }
            : {
                ...preTotal,
                // outlay: parseFloat(cur.amount) + preTotal.outlay,
                outlay: Number(
                  math.evaluate(`${cur.amount}+${preTotal.outlay}`)
                ),
              };
        },
        { income: 0, outlay: 0 }
      );

      temp['time'] = key;
      temp['data'] = value;
      Object.assign(temp, total);
      bills.push(temp);
    });

    return bills;
  },
  //获取收入和支出的总和
  getTotal(billDetails: BillsData.Bills[]): BillsData.TotalGroup {
    return billDetails.reduce(
      (preTotal, cur) => ({
        totalIncome: cur.income + preTotal.totalIncome,
        totalOutlay: cur.outlay + preTotal.totalOutlay,
      }),
      { totalIncome: 0, totalOutlay: 0 }
    );
  },
};
