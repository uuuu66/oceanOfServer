import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateUserDto } from './dtos/create-user.dto';
import { ReadUserDto } from './dtos/read-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await new this.userModel(createUserDto).save();
      if (!newUser) throw Error;
      return newUser;
    } catch (err) {
      throw new HttpException(
        new Error(`잘못된 요청입니다`),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async readUsers() {
    const users = await this.userModel.find();

    if (users)
      return users.map((val) => {
        return new ReadUserDto(val);
      });
    throw new HttpException(
      new Error(`유저가 존재하지 않습니다.`),
      HttpStatus.NOT_FOUND,
    );
  }
  async readUserByPhoneNumber(phoneNumber: string) {
    const user = await this.userModel.findOne({ phoneNumber });
    user.password = null;
    if (user) return user;
    throw new HttpException(
      new Error(`유저가 존재하지 않습니다`),
      HttpStatus.UNAUTHORIZED,
    );
  }
  async readUserById(id: Types.ObjectId) {
    const user = await this.userModel.findOne({ id });
    user.password = null;
    if (user) return user;
    throw new HttpException(
      new Error(`유저가 존재하지 않습니다`),
      HttpStatus.UNAUTHORIZED,
    );
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
