import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserId } from 'src/decorators/userId.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
    private userService: UsersService,
  ) {}

  async create(dto: CreatePostDto, author: string) {
    const user = await this.userService.findById(author);

    return this.repository.save({ ...dto, author: user, likes: 0 });
  }
}
