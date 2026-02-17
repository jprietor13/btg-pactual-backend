import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop({ default: 500000 })
  balance: number;

  @Prop({ default: 'CLIENT' })
  role: string;

  @Prop({ enum: ['EMAIL', 'SMS'], default: 'EMAIL' })
  notificationPreference: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
