import { Module } from '@nestjs/common';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import models from './models';

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_SYNC } = process.env;

@Module({
  imports: [TypeOrmCoreModule.forRoot({
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    entities: [...models],
    synchronize: Boolean(DB_SYNC),
    logging: process.env.NODE_ENV === 'production' ? false : 'all',
  })],
})
export class DbModule {}
