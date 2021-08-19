# 前言

这是采用 Egg.js 和 TypeScript 编写的后端 node-server。

为了统一接口数据，简化代码，采用抛出 HttpException 类和其子类（继承自 Error）的实例的方式由全局异常中间件统一处理接口数据。

以下是目录结构以及解释：

```bash
app
├── controller
│
├── extend
│
├── middleware
│
├── model
│
├── public
│
├── router.ts
│
└── service
```

middleware

- 全局捕获异常
- token 验证
- 404 处理

extend

- HttpException 类和其子类
- helper 封装常用的 utility 函数

controller

- 只处理 response 逻辑以便于 service 内的代码复用

service

- 为了复用代码，这里主要用于处理数据校验、数据库操作等

model

- sequelize 定义数据库表

public

- 文件等静态资源上传

## 接口

以下为路由清单，接口详情请查看 Swagger 文档

```javascript
/api/user/login 登录或注册登录
/api/user/getUserInfo 获取用户信息
/api/user/editUserInfo 获取用户信息
/api/user/upload 统一的上传文件接口
```

## 插件清单

- egg-jwt
- egg-sequelize
- egg-validate

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
