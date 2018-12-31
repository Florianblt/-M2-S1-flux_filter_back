import { JwtService } from '@nestjs/jwt';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { sign, SignOptions } from 'jsonwebtoken';
import { User } from 'user/user.entity';

@Injectable()
export class AuthService {
  private readonly jwtOptions: SignOptions;
  private readonly jwtKey: string;

  constructor(
    @Inject(forwardRef(() => UserService)) readonly userService: UserService,
  ) {
    this.jwtOptions = { expiresIn: '12h' };
    this.jwtKey = process.env.JWT_KEY;
  }

  async signPayload(payload: JwtPayload): Promise<string> {
    return sign(payload, this.jwtKey, this.jwtOptions);
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return this.userService.findOneWithEmail(payload.email);
  }
}
