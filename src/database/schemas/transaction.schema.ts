import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  transactionId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  fundId: string;

  @Prop({ required: true, enum: ['SUBSCRIBE', 'CANCEL'] })
  type: 'SUBSCRIBE' | 'CANCEL';

  @Prop({ required: true })
  amount: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
