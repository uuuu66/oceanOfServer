import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { Document } from 'mongoose';
import { subscribeType } from 'src/common/enums';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({})
  @Prop({ required: true })
  nickName: string;

  @ApiProperty({})
  @Prop({ required: false })
  profileImageId: number;

  @ApiProperty({})
  @Prop()
  subscribe: subscribeType;

  @ApiProperty({})
  @Prop({ unique: true })
  phoneNumber: string;

  @ApiProperty({})
  @Prop()
  email: string;

  @ApiProperty({})
  @Prop()
  name: string;

  @ApiProperty({})
  @Prop()
  gender: string;

  @ApiProperty({})
  @Prop()
  introduction: string;

  @ApiProperty({})
  @Prop()
  role: number;

  @ApiProperty({})
  @Prop()
  logInChannel: number;

  @ApiProperty({})
  @Prop({ type: Date })
  loggedInAt: Date;

  @ApiProperty({})
  @Prop()
  feeling: string;

  @ApiProperty({})
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
