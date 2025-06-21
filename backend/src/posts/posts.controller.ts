import { Controller, Post as HttpPost, Get, Body, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  create(@Request() req, @Body() body: { title: string; description: string }) {
    return this.postsService.create(req.user.userId, body.title, body.description);
  }

  @UseGuards(JwtAuthGuard)
  @Get('timeline')
  timeline(@Request() req) {
    return this.postsService.timeline(req.user.userId);
  }
}
