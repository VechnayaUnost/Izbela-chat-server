import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { UserRequestDto, UserResponseDto } from './utils/dto';
import { UserService } from './user.service';
import { JwtService } from './jwt.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    ) {}

  @Post('register')
  async register(@Body() user: UserRequestDto, @Res() res: Response) {
    const savedUser = await this.userService.register(user);
    const token = this.jwtService.generateToken(savedUser.id);

    const userDto = plainToClass(UserResponseDto, savedUser, {strategy: 'excludeAll'});

    res.setHeader('Authorization', token);
    res.status(201).send(userDto);
  }

  @Post('login')
  async login(@Body() userData: UserRequestDto, @Res() res: Response) {
    const user = await this.userService.login(userData);
    const token = this.jwtService.generateToken(user.id);

    const userDto = plainToClass(UserResponseDto, user, {strategy: 'excludeAll'});

    res.setHeader('Authorization', token);
    res.status(200).send(userDto);
  }

  @Get()
  getUser(@Req() req: Request) {
    return plainToClass(UserResponseDto, this.userService.getData(req.headers.authorization));
  }
}
