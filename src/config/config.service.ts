import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { Expose, plainToClass } from 'class-transformer';

@Injectable()
export class ConfigService {
  @Expose() public CLIENT_URL: string;
  @Expose() public DB_HOST: string;
  @Expose() public DB_PORT: number;
  @Expose() public DB_USER: string;
  @Expose() public DB_PASS: string;
  @Expose() public DB_NAME: string;
  @Expose() public DB_SYNC: string;
  @Expose() public JWT_SECRET: string;

  public static create() {
    dotenv.config();

    return plainToClass(ConfigService, process.env, {strategy: 'excludeAll'});
  }
}
