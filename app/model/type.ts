export default app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Type = app.model.define('types', {
    name: {
      type: STRING(50),
      comment: '标签分类名',
    },
    type: { type: INTEGER(11), comment: '标签类型 1为收入 2为支出' },
  });

  Type.sync();
  return Type;
};
