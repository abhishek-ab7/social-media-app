import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async signup(username: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.userService.createUser(username, hashed);
  }

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return { access_token: this.jwtService.sign({ username, sub: user._id }) };
    }
    throw new Error('Invalid credentials');
  }
}