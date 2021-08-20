import { Context } from 'egg';
import * as fs from 'fs';
import moment = require('moment');

module.exports = {
  getToken(ctx: Context): string | undefined {
    const authorization = ctx.request.header?.authorization as string;
    if (authorization) {
      let [_, token] = authorization.split(' ');
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
  handleMonthBills(MonthBills: BillsData.record[]) {
    const map: Map<string, BillsData.record[]> = new Map();
    //按照日期归类
    for (let item of MonthBills) {
      let attr = moment(item.date).format('MM-DD');
      if (map.get(attr)) {
        map.get(attr)!.push(item);
        continue;
      }
      map.set(attr, [item]);
    }

    const bills: any[] = [];
    map.forEach((value, key) => {
      let temp = {};
      temp['time'] = key;
      //计算 total
      const total = value.reduce((preTotal, cur) => {
        return Number(cur.amount) + preTotal;
      }, 0);
      temp['total'] = total;
      temp['data'] = value;
      bills.push(temp);
    });

    return bills;
  },
};
