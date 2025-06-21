import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://abhishek79saini:wjnUQGeFTmSIAwqe@socialapp.zvbqoip.mongodb.net/'),
    AuthModule,
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
