import { Application } from 'egg';

export default (app: Application) => {
  const {
    controller: { user, upload, bill, type },
    router,
    middleware,
  } = app;
  const validateToken = middleware.validateToken();
  router.post('/api/user/login', user.login);
  router.get('/api/user/getUserInfo', validateToken, user.getUserInfo);
  router.post('/api/user/clockIn', validateToken, user.clockIn);
  router.put('/api/user/editUserInfo', validateToken, user.editUserInfo);
  router.post('/api/user/uploadFiles', upload.uploadFiles);
  router.post('/api/user/upload', upload.uploadFile);
  router.post('/api/bill/add', validateToken, bill.add);
  router.get('/api/bill/getUserBills', validateToken, bill.getUserBills);
  router.get('/api/bill/getBillsByDate', validateToken, bill.getBillsByDate);
  router.put('/api/bill/updateBill', validateToken, bill.updateBill);
  router.get(
    '/api/bill/getStatistics',
    validateToken,
    bill.getTop5StatisticsById
  );
  router.get('/api/type/getIconList', validateToken, type.getIconList);
  // router.get(
  //   '/api/bill/getBillsForMonth',
  //   validateToken,
  //   bill.getDailyBillsByMonth
  // );
  // router.get(
  //   '/api/bill/getBillsForYear',
  //   validateToken,
  //   bill.getMonthlyBillsByYear
  // );
};
