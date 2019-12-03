import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DbModule } from './db/db.module';
import { JwtService } from './jwt.service';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { LoggerService } from './logger.service';
import { JwtMiddleware } from './jwt.middleware';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity, RoomEntity, UserEntity } from './db/models';

@Module({
  imports: [ConfigModule, DbModule, TypeOrmModule.forFeature([MessageEntity, UserEntity, RoomEntity])],
  providers: [JwtService, SocketService, SocketGateway, LoggerService, UserService],
  controllers: [UserController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware)
      .forRoutes({path: '/user', method: RequestMethod.GET});
  }
}
