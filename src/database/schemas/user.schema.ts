import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 500000 })
  balance: number;

  @Prop({ default: 'CLIENT' })
  role: string;

  @Prop({ type: String, enum: ['EMAIL', 'SMS'], default: 'EMAIL' })
  notificationPreference: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
