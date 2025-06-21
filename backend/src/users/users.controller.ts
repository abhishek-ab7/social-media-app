import { Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('follow/:id')
  follow(@Request() req, @Param('id') id: string) {
    return this.userService.follow(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('unfollow/:id')
  unfollow(@Request() req, @Param('id') id: string) {
    return this.userService.unfollow(req.user.userId, id);
  }
}
