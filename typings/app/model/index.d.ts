// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBill from '../../../app/model/bill';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Bill: ReturnType<typeof ExportBill>;
    User: ReturnType<typeof ExportUser>;
  }
}
