import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from './user.service';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from './jwt.service';
import { JsonWebTokenError } from './utils/errors';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (token) {
      const decoded = this.jwtService.verifyAndDecodeToken<{id: string}>(token);
      const newToken = this.jwtService.generateToken(decoded.id);

      req.headers.authorization = newToken;
      res.setHeader('Authorization', newToken);
      next();
    } else {
      throw new JsonWebTokenError();
    }
  }
}
