import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { addSalt, encript } from 'src/utils/encryption';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    /**
     * 通过中间件加密密码
     */
    let userPassword = req.body['password'];
    const salt = addSalt();

    if (userPassword) {
      req.body['salt'] = salt;
      req.body['password'] = encript(userPassword, salt);
    }

    next();
  }
}
