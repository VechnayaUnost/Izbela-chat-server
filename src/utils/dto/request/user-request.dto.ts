import { IsString } from 'class-validator';

export class UserRequestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
