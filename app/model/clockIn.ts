export default app => {
  const { DATE, INTEGER } = app.Sequelize;
  const ClockIn = app.model.define('clock_in', {
    userId: { type: INTEGER(11), comment: '用户id' },
    date: { type: DATE, comment: '打卡时间' },
  });

  ClockIn.sync();

  return ClockIn;
};
