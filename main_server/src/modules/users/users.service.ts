import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  //Signup user method with username and password
  async insertUser(email: string, password: string) {
    const newUser = new this.userModel({
      email,
      password,
    });
    await newUser.save();
    return newUser;
  }
  //log in user using the findOne method
  async getUser(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
