import { Injectable } from '@nestjs/common';
import { MessageDto } from './utils/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity, RoomEntity } from './db/models';
import { Repository } from 'typeorm';
import { RoomDto } from './utils/dto/room.dto';

@Injectable()
export class SocketService {
  constructor(
    @InjectRepository(MessageEntity) private messageRepo: Repository<MessageEntity>,
    @InjectRepository(RoomEntity) private roomRepo: Repository<RoomEntity>,
  ) {}

  public async saveMessage(message: MessageDto, user: any) {
    const room = await this.roomRepo.findOne(message.roomId);

    const msg = new MessageEntity();
    msg.room = room;
    msg.user = user;
    msg.text = message.text;

    await this.messageRepo.save(msg);
    return this.getMessages(room.id);
  }

  public async getMessages(roomId: string) {
    const room = await this.roomRepo.findOne({id: roomId}, {relations: ['messages', 'messages.user']});

    if (!room) {
      return [];
    }

    return room.messages.map(msg => ({...msg, roomId}));
  }

  public createRoom(room: RoomDto) {
    const newRoom = new RoomEntity();
    newRoom.name = room.name;

    return this.roomRepo.save(newRoom);
  }

  public getRooms() {
    return this.roomRepo.find();
  }
}
