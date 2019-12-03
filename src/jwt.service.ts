import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { JsonWebTokenError, TokenExpiredError } from './utils/errors';
import { LoggerService } from './logger.service';

@Injectable()
export class JwtService {
  constructor(
    private config: ConfigService,
    private logger: LoggerService,
  ) {}

  public generateToken(id: string): string {
    return jwt.sign({id}, this.config.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '2 days',
    });
  }

  public verifyAndDecodeToken<T = object>(token: string): T {
    try {
      return jwt.verify(token, this.config.JWT_SECRET);
    } catch (err) {
      switch (err.name) {
        case 'TokenExpiredError': {
          this.logger.error('TokenExpiredError');
          throw new TokenExpiredError();
        }
        case 'JsonWebTokenError': {
          this.logger.error('JsonWebTokenError');
          throw new JsonWebTokenError();
        }
        default: {
          this.logger.error('JsonWebTokenError');
          throw new JsonWebTokenError();
        }
      }
    }
  }
}
