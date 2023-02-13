import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { subscribeType } from 'src/common/enums';
export class CreateUserDto {
  @ApiProperty({ description: '닉네임' })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly nickName: string;
  @ApiPropertyOptional({ description: '구독' })
  @IsEnum(subscribeType)
  @IsOptional()
  readonly subscribe: subscribeType;
  @ApiProperty({ description: '폰번호' })
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;
  @ApiPropertyOptional({ description: '프로필아이디' })
  @IsString()
  @MaxLength(30)
  @IsOptional()
  readonly profileImageId: string;
  @ApiPropertyOptional({ description: '소개' })
  @IsString()
  @MaxLength(500)
  @IsOptional()
  readonly introduction: string;
  @ApiProperty({ description: '비밀번호' })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly password: string;
}
