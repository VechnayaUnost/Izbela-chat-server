import { IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  text: string;

  @IsString()
  roomId: string;
}
