import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/userId.decorator';
import { UsersService } from 'src/users/users.service';
import { PostEntity } from './entities/post.entity';

@Controller('posts')
@ApiTags('posts')
@ApiBearerAuth()
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiBody({ type: CreatePostDto })
  @UseGuards(JwtAuthGuard)
  create(@Body() createPostDto: CreatePostDto, @UserId() id: string) {
    return this.postsService.create(createPostDto, id);
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard)
  async getPosts(@Param('id') id: string) {
    const posts = await this.postsService.getPostsById(id);

    return { posts };
  }

  @Post('delete/:id')
  @UseGuards(JwtAuthGuard)
  async deletePosts(@Param('id') id: string, @UserId() myId: string) {
    const posts = await this.postsService.deletePostById(id, myId);
    return { message: 'deleted' };
  }

  @Post('like/:id')
  @UseGuards(JwtAuthGuard)
  async likePost(@Param('id') id: string) {
    const post = await this.postsService.likePostById(id);

    return { post };
  }

  @Get('/feed')
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'cursor' })
  async getFeed(@UserId() id: string, @Query() cursor) {
    const user = await this.usersService.findById(id);

    const arr = user.friendIds;

    const arr2 = await this.postsService.getPostsByIds(arr, cursor);

    return arr2.slice(cursor.cursor, cursor.cursor + 15);
  }
}
