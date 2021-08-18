import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1629246903805_9311';
  config.env = 'development';
  // add your egg config in here
  config.middleware = ['catchError', 'notfoundHandler'];
  // sequelize 的初始化配置
  config.sequelize = {
    dialect: 'mysql', // 数据库类型
    host: '127.0.0.1', // 路径
    port: 3306, // 端口号
    database: 'account_book', // 数据库名称
    username: 'root', // 账号
    password: '123456', // 密码
    timezone: '+08:00', // 东八区时间
    dialectOptions: {
      dateStrings: true, // 查看时间时显示为 string
      typeCast(field, next) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
    define: {
      underscored: true, // 驼峰命名小写
      freezeTableName: true, // 表名自由设置
    },
  };
  config.jwt = {
    secret: 'qiuyanxi', //密钥
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'], // 配置白名单
  };
  // add your special config 通过 this.config 可以读取
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    // expires: 2 * 60 * 60,
    expires: 30,
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
