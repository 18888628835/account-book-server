import { Context } from 'egg';
import * as fs from 'fs';

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
};
