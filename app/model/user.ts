export default app => {
  const { STRING } = app.Sequelize;
  const User = app.model.define('users', {
    phone: {
      type: STRING(11),
      allowNull: false,
      unique: true,
      Comment: '手机号码',
    },
    password: { type: STRING(50), Comment: '密码' },
    userName: { type: STRING(50), Comment: '用户名' },
    avatar: { type: STRING(50), Comment: '头像' },
    signature: { type: STRING(50), Comment: '个性签名' },
  });

  if (app.config.env === 'development') {
    User.sync({ force: true });
  } else {
    User.sync();
  }

  return User;
};
