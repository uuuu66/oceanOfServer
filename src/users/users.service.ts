import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await new this.userModel(createUserDto).save();
  }

  async readUserByPhoneNumber(phoneNumber: string) {
    const user = await this.userModel.findOne({ phoneNumber });
    if (user) return user;
    throw new NotFoundException(`해당 번호로 가입된 유저가 없습니다`);
  }
  async readUserById(id: number) {
    const user = await this.userModel.findOne({ id });
    if (user) return user;
    throw new NotFoundException(`유저가 존재하지 않습니다`);
  }
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userData = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    if (!userData) {
      throw new NotFoundException(`User #${userId} is Missing`);
    }
    return userData;
  }
  async deleteUser(userId: string) {
    await this.userModel.findByIdAndRemove(userId);
  }
}
