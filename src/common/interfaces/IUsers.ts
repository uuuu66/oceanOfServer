import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly name: string;
  readonly roleId: number;
  readonly provider: string;
  readonly gender: string;
  password: string;
  phoneNumber: string;
  nickname: string;
}
