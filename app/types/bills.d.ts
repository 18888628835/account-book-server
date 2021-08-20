declare module BillsData {
  export type record = {
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
}
