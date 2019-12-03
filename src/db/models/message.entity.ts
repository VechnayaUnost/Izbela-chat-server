import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoomEntity } from './room.entity';
import { UserEntity } from './user.entity';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => RoomEntity, (room) => room.messages)
  room: RoomEntity;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  user: UserEntity;
}
