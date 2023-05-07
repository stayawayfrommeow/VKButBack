import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  text?: string;

  @ApiProperty()
  attachment?: string;
}
