import { UnauthorizedException } from '@nestjs/common';

export class TokenExpiredError extends UnauthorizedException {
  constructor() {
    super('Token expired');
  }
}
