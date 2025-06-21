import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(userId: string, title: string, description: string) {
    return new this.postModel({ userId, title, description }).save();
  }

  async timeline(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      return [];
    }
    return this.postModel.find({ userId: { $in: user.following } }).sort({ _id: -1 });
  }
}
