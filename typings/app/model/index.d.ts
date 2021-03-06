// This file is created by egg-ts-helper@1.27.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBill from '../../../app/model/bill';
import ExportClockIn from '../../../app/model/clockIn';
import ExportType from '../../../app/model/type';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Bill: ReturnType<typeof ExportBill>;
    ClockIn: ReturnType<typeof ExportClockIn>;
    Type: ReturnType<typeof ExportType>;
    User: ReturnType<typeof ExportUser>;
  }
}
