import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ nullable: true })
  id: string;

  @ApiProperty({ nullable: true })
  profileImage: string;

  @ApiProperty({ nullable: true })
  firstName: string;

  @ApiProperty({ nullable: true })
  secondName: string;

  @ApiProperty({ nullable: true })
  age: string;

  @ApiProperty({ nullable: true })
  city: string;

  @ApiProperty({ nullable: true })
  university: string;
}
