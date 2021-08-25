export default app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Type = app.model.define('types', {
    name: {
      type: STRING(50),
      comment: '标签分类名',
    },
    type: { type: INTEGER(11), comment: '标签类型 1为支出 2为收入' },
  });

  Type.sync();
  return Type;
};
