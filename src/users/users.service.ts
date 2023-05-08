import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ILike, Like, Repository } from 'typeorm';

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
    return this.repository.findOneBy({ id });
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
}
