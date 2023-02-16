import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/users/schemas/user.schema';

export default class AuthResponseDto extends PickType(User, [
  'email',
  'name',
  'nickName',
  'password',
  'phoneNumber',
  'introduction',
  'logInChannel',
  'gender',
  'loggedInAt',
]) {
  super(user: User, accessToken: string) {
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.phoneNumber = user.phoneNumber;
    this.nickName = user.nickName;
    this.accessToken = accessToken;
    this.logInChannel = user.logInChannel;
    this.gender = user.gender;
    this.introduction = user.introduction;
  }

  accessToken: string;
}
