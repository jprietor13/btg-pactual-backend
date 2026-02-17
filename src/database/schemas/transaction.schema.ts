import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ timestamps: true })
export class Transaction {
  @Prop()
  id: string;

  @Prop()
  userId: string;

  @Prop()
  fundId: string;

  @Prop()
  type: 'SUBSCRIBE' | 'CANCEL';

  @Prop()
  amount: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
