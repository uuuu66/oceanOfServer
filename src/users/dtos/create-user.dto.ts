import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { subscribeType } from 'src/common/enums';
export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly nickName: string;

  @IsEnum(subscribeType)
  @IsOptional()
  readonly subscribe: subscribeType;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  readonly profileImageId: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  readonly introduction: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly password: string;
}
