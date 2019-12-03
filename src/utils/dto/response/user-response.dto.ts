import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  username: string;
}
