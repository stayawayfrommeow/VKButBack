import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ILike, In, Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  getRepository(Photo: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findByLogin(login: string) {
    return this.repository.findOneBy({ login });
  }

  async findUsers(search: string) {
    return this.repository.find({
      where: [
        {
          firstName: Like(`%${search}%`),
        },
        {
          secondName: Like(`%${search}%`),
        },
      ],
    });
  }

  async findById(id: string) {
    return await this.repository.findOneBy({ id });
  }

  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  async update(dto: UpdateUserDto) {
    const { id, ...data } = dto;

    await this.repository.update(dto.id, data);

    return {
      message: 'Successfully updated profile',
    };
  }

  async befriend(friendId: string, myId: string) {
    await this.repository.update(friendId, {
      friendIds: [
        ...(await this.repository.findOneBy({ id: friendId })).friendIds,
        myId,
      ],
    });
    await this.repository.update(myId, {
      friendIds: [
        ...(await this.repository.findOneBy({ id: myId })).friendIds,
        friendId,
      ],
    });

    return await this.repository.findOneBy({ id: myId });
  }
  async unfriend(friendId: string, myId: string) {
    await this.repository.update(friendId, {
      friendIds: (
        await this.repository.findOneBy({ id: friendId })
      ).friendIds.filter((id) => +id !== +myId),
    });

    const myNewFriends = (
      await this.repository.findOneBy({ id: myId })
    ).friendIds.filter((id) => +id !== +friendId);

    await this.repository.update(myId, {
      friendIds: myNewFriends,
    });

    return await this.repository.findOneBy({ id: myId });
  }

  // async getPostsByIds(ids: string[], cursor: number) {
  //   return await this.repository.find({
  //     relations: { posts: true },
  //     where: { id: In(ids) },
  //   });
  // }
}
