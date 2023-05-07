import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/userId.decorator';
import { UsersService } from 'src/users/users.service';

@Controller('posts')
@ApiTags('posts')
@ApiBearerAuth()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBody({ type: CreatePostDto })
  @UseGuards(JwtAuthGuard)
  create(@Body() createPostDto: CreatePostDto, @UserId() id: string) {
    return this.postsService.create(createPostDto, id);
  }
}
