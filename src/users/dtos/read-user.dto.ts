import { OmitType } from '@nestjs/swagger';

import { User } from '../schemas/user.schema';

export class ReadUserDto extends OmitType(User, ['password']) {
  constructor(user: User) {
    super();
    this.email = user.email;
    this.name = user.name;

    this.phoneNumber = user.phoneNumber;
    this.nickName = user.nickName;

    this.logInChannel = user.logInChannel;
    this.gender = user.gender;
    this.introduction = user.introduction;

    this.subscribe = user.subscribe;
    this.feeling = user.feeling;
    this.loggedInAt = user.loggedInAt;
  }
}
