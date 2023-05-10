import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  attachment: string;

  // @Column()
  // author: UserEntity;

  @JoinColumn()
  @ManyToOne(() => UserEntity, (user) => user.posts)
  author: UserEntity;

  @Column()
  likes: number;
}
