import { PickType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up-dto';

export default class SignInDto extends PickType(SignUpDto, [
  'password',
  'phoneNumber',
]) {}
