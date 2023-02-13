import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '닉네임' })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly nickName: string;

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

  @ApiPropertyOptional({ description: '오늘의 기분' })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  feeling?: string;

  @ApiPropertyOptional({ description: '권한아이디' })
  @IsNumber()
  @MaxLength(30)
  @IsNotEmpty()
  role?: number;
}
