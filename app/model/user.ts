export default app => {
  const { STRING, BOOLEAN } = app.Sequelize;
  const User = app.model.define('users', {
    phone: {
      type: STRING(11),
      allowNull: false,
      unique: true,
      comment: '手机号码',
    },
    password: { type: STRING(50), comment: '密码' },
    userName: { type: STRING(50), comment: '用户名' },
    avatar: { type: STRING(100), comment: '头像地址' },
    gender: { type: BOOLEAN, comment: '性别 0女1男', defaultValue: true },
    budget: { type: STRING(50), comment: '每月预算', defaultValue: '0' },
  });

  User.sync();

  return User;
};
