import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createUser(username: string, password: string) {
    return new this.userModel({ username, password }).save();
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  findById(id: string) {
    return this.userModel.findById(id).populate('following').populate('followers').exec();
  }

  findAll() {
    return this.userModel.find().populate('following').populate('followers').exec();
  }

  follow(userId: string, followId: string) {
    const p1 = this.userModel.findByIdAndUpdate(userId, { $addToSet: { following: followId } }).exec();
    const p2 = this.userModel.findByIdAndUpdate(followId, { $addToSet: { followers: userId } }).exec();
    return Promise.all([p1, p2]);
  }

  unfollow(userId: string, unfollowId: string) {
    const p1 = this.userModel.findByIdAndUpdate(userId, { $pull: { following: unfollowId } }).exec();
    const p2 = this.userModel.findByIdAndUpdate(unfollowId, { $pull: { followers: userId } }).exec();
    return Promise.all([p1, p2]);
  }
}
