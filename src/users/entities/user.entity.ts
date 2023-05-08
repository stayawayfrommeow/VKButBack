import { PostEntity } from 'src/posts/entities/post.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  secondName: string;

  @Column({ nullable: true })
  age: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  university: string;

  // @Column('text', { array: true, nullable: true })
  // postIds: string[];

  @JoinColumn()
  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];

  @Column('text', { array: true, nullable: true, default: [] })
  friendIds: string[];
}
