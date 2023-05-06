import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  // @Column()
  // profileImage: string;

  // @Column()
  // firstName: string;

  // @Column()
  // secondName: string;

  // @Column()
  // age: string;

  // @Column()
  // city: string;

  // @Column()
  // university: string;

  // @Column('text', { array: true })
  // postIds: string[];

  // @Column('text', { array: true })
  // friendIds: string[];
}
