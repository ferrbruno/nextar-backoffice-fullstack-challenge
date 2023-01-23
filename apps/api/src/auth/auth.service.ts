import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AuthUser } from 'common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne({ email });

    if (user) {
      const { password: passwordHash, ...result } = user;

      const isValid = await compare(password, passwordHash);

      if (isValid) {
        return result;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      userId: user._id,
      name: user.name,
      email: user.email,
      permission: user.permission,
    } satisfies AuthUser;

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
