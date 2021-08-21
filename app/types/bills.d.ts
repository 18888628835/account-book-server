declare module BillsData {
  export type Record = {
    id: number;
    payType: number;
    amount: string;
    date: Date;
    typeId?: any;
    userId: number;
    remark?: any;
    createdAt: Date;
    updatedAt: Date;
  };
  export type TotalGroup = {
    totalIncome: number;
    totalOutlay: number;
  };
  export type Bills = {
    income: number;
    outlay: number;
    time: string;
    data: Record[];
  };
  export type BillsWithTotal = {
    totalIncome: number;
    totalOutlay: number;
    list: RootObject;
  };
}
