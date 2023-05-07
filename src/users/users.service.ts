import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ILike, Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findByLogin(login: string) {
    return this.repository.findOneBy({ login });
  }

  async findFriends(search: string) {
    return this.repository.find({
      where: {
        firstName: Like(`%${search}%`),
        secondName: Like(`%${search}%`),
      },
    });
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }
}
