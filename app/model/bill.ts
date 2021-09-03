export default app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;
  const Bill = app.model.define('bills', {
    payType: {
      type: INTEGER(11),
      allowNull: false,
      comment: '账单类型 1为支出 2为收入',
    },
    amount: { type: STRING(50), comment: '账单价格' },
    date: { type: DATE, comment: '账单日期' },
    typeName: {
      type: STRING(50),
      unique: true,
      allowNull: false,
      comment: '标签的className',
    },
    userId: { type: INTEGER(11), comment: '对应的用户 id' },
    remark: { type: STRING(50), comment: '账单备注' },
    deleteFlag: {
      type: BOOLEAN,
      comment: 'true删除,false未删',
      allowNull: false,
      defaultValue: false,
    },
  });

  Bill.sync();

  return Bill;
};
