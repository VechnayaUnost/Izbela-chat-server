import { UnauthorizedException } from '@nestjs/common';

export class JsonWebTokenError extends UnauthorizedException {
  constructor() {
    super('Invalid token');
  }
}
