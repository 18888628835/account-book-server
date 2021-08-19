export default app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Bill = app.model.define('bills', {
    payType: {
      type: INTEGER(11),
      allowNull: false,
      Comment: '账单类型 1为支出 2为收入',
    },
    amount: { type: STRING(50), Comment: '账单价格' },
    date: { type: DATE, Comment: '账单日期' },
    typeId: { type: INTEGER(11), Comment: '标签 id' },
    userId: { type: INTEGER(11), Comment: '用户 id' },
    remark: { type: STRING(50), Comment: '账单备注' },
  });

  Bill.sync();

  return Bill;
};