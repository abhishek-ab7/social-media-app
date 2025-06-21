import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Signup Route
  @Post('signup')
  async signup(@Body() body: { username: string; password: string }) {
    return this.authService.signup(body.username, body.password);
  }

  // Login Route
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  // Profile Route (for fetching current user's ID from JWT)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return { userId: req.user.userId };
  }
}
