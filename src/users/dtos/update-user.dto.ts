import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PickType(CreateUserDto, [
  'nickName',
  'profileImageId',
  'phoneNumber',
  'introduction',
]) {}
