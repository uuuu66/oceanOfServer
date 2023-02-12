import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly password: string;
}
