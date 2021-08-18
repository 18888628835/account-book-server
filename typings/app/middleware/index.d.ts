// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCatchError from '../../../app/middleware/catch_error';
import ExportNotfoundHandler from '../../../app/middleware/notfound_handler';
import ExportValidateToken from '../../../app/middleware/validate_token';

declare module 'egg' {
  interface IMiddleware {
    catchError: typeof ExportCatchError;
    notfoundHandler: typeof ExportNotfoundHandler;
    validateToken: typeof ExportValidateToken;
  }
}
