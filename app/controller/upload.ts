import { Controller } from 'egg';
import * as path from 'path';
import * as moment from 'moment';
import * as mkdirp from 'mkdirp';
import * as fs from 'fs';
import * as sendToWormhole from 'stream-wormhole';

export default class UploadController extends Controller {
  /**
   * 公用上传文件 官方文档 https://eggjs.github.io/zh/guide/upload.html
   */
  public async uploadFiles() {
    const { ctx, app } = this;
    // 配置 config.default.ts中的 config.multipart属性
    const files = ctx.request.files;
    let pathUrl;
    try {
      for (let file of files) {
        //读取文件
        const f = await ctx.helper.readFile(file.filepath);
        //以天为单位，创建当天保存的目录名 2021-xx-xx
        const day = moment(Date.now()).format('YYYY-MM-DD');
        //保存目录和上传图片目录合并 app/upload/2021-xx-xx
        const dirPath = path.join(this.config.uploadDir, day);
        //创建目录
        await mkdirp(dirPath);
        // path.extname返回扩展名 .png .jpeg
        const fileName = Date.now().toString() + path.extname(file.filename);
        // app/upload/2021-xx-xx/xxx.png
        const writePath = path.join(dirPath, fileName);
        //写入文件
        pathUrl = await ctx.helper.writeFile(writePath, f);
      }
    } finally {
      // 需要删除临时文件 egg 文档
      await ctx.cleanupRequestFiles();
    }
    throw app.Success('上传成功', {
      url: pathUrl.replace('app', ''),
    });
  }
  /**
   * stream 流式上传
   */
  public async uploadFile() {
    const { ctx, app } = this;
    //读取文件
    const readStream = await ctx.getFileStream();

    let targetPath;
    try {
      //以天为单位，创建当天保存的目录名 2021-xx-xx
      const day = moment(Date.now()).format('YYYY-MM-DD');
      //保存目录和上传图片目录合并 app/upload/2021-xx-xx
      const dirPath = path.join(this.config.uploadDir, day);
      //创建目录
      await mkdirp(dirPath);
      const fileName = readStream.filename;
      // app/upload/2021-xx-xx/xxx.png
      targetPath = path.join(dirPath, fileName);
      // 创建写入流
      const writeStream = fs.createWriteStream(targetPath);
      //管道写入流
      readStream.pipe(writeStream);
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(readStream);
      throw err;
    }
    throw app.Success('上传成功', {
      url: targetPath.replace('app', ''),
    });
  }
}
