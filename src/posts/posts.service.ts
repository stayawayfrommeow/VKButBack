import { Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { In, Repository } from 'typeorm';
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

  async getPostsById(id: string) {
    return await this.repository.find({
      relations: { author: true },
      where: { author: { id: id } },
    });
  }

  async getPostsByIds(ids: string[], cursor: number) {
    return await this.repository.find({
      relations: { author: true },
      where: { author: { id: In(ids) } },
    });
  }

  async deletePostById(id: string, myId: string) {
    const postToDelete = await this.repository.find({
      where: { id: id },
      relations: { author: true },
    });

    await this.repository.remove(postToDelete);

    return { s: 's' };
  }

  async create(dto: CreatePostDto, author: string) {
    const user = await this.userService.findById(author);

    return this.repository.save({ ...dto, author: user, likes: 0 });
  }

  async likePostById(id: string) {
    const postToLike = await this.repository.findOne({
      where: { id },
      relations: { author: true },
    });

    await this.repository.update(id, { likes: postToLike.likes + 1 });
  }
}
