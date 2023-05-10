import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/userId.decorator';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: UpdateUserDto })
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@UserId() id: string) {
    return this.usersService.findById(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('/friends/:id')
  @UseGuards(JwtAuthGuard)
  async getFriends(@Param('id') id: string) {
    const user = await this.usersService.findById(id);

    const friendList = user.friendIds?.map(async (id) => {
      const fullUser = await this.usersService.findById(id);

      const { profileImage, firstName, secondName } = fullUser;

      return { id, profileImage, firstName, secondName };
    });

    return friendList ? friendList : null;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'search' })
  async findUsers(@Query() query) {
    return await this.usersService.findUsers(query.search);
  }

  @Post('befriend')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        friendId: {
          type: 'string',
        },
      },
    },
  })
  befriend(@Body() body: { friendId: string }, @UserId() myId: string) {
    return this.usersService.befriend(body.friendId, myId);
  }

  @Post('unfriend')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        friendId: {
          type: 'string',
        },
      },
    },
  })
  unfriend(@Body() body: { friendId: string }, @UserId() myId: string) {
    return this.usersService.unfriend(body.friendId, myId);
  }
}
