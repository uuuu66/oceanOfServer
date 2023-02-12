import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { subscribeType } from 'src/common/enums';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: number;

  @Prop({ required: true })
  nickName: string;

  @Prop()
  subscribe: subscribeType;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  gender: string;

  @Prop()
  introduction: string;

  @Prop()
  role: number;

  @Prop()
  logInChannel: number;

  @Prop()
  loggedInAt: string;

  @Prop()
  feeling: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
