export default app => {
  const { STRING } = app.Sequelize;
  const User = app.model.define('users', {
    phone: {
      type: STRING(11),
      allowNull: false,
      unique: true,
      comment: '手机号码',
    },
    password: { type: STRING(50), comment: '密码' },
    userName: { type: STRING(50), comment: '用户名' },
    avatar: { type: STRING(50), comment: '头像' },
    signature: { type: STRING(50), comment: '个性签名' },
  });

  User.sync();

  return User;
};
