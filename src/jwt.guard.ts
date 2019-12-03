import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JsonWebTokenError } from './utils/errors';
import { UserService } from './user.service';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from './utils/dto/response';
import { LoggerService } from './logger.service';

export interface IJwtGuardProps {
  user: UserResponseDto;
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private logger: LoggerService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const { token } = context.switchToWs().getClient().handshake.query;

    if (!token) {
      this.logger.error('no jwt token');
      throw new JsonWebTokenError();
    }

    const foundUser = await this.userService.getData(token);

    if (!foundUser) {
      this.logger.error('no user');
      throw new JsonWebTokenError();
    }

    const user = plainToClass(UserResponseDto, foundUser);

    context.switchToWs().getData().user = user;

    return Boolean(user);
  }
}
