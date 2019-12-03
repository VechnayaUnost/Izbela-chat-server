import { BadRequestException } from '@nestjs/common';

export class UserExistsError extends BadRequestException {
  constructor() {
    super('User with such username already exists');
  }
}
