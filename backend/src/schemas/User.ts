import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../models/IUser';

export type UserDocument = HydratedDocument<IUser>;

@Schema()
export class User {
  @Prop() id: string;
  @Prop() psw: string;
  @Prop() cardNumber: string;
  @Prop() login: string;
  @Prop() email: string;
  @Prop() role: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
