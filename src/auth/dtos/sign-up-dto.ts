import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

export class SignUpDto extends OmitType(CreateUserDto, ['role', 'feeling']) {}
