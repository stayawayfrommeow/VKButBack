import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.findByLogin(login);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    try {
      const userData = await this.userService.create(dto);

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('registration error');
    }
  }

  async login(user: UserEntity) {
    const payload = { id: user.id };

    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
