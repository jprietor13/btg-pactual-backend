import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FundDocument = HydratedDocument<Fund>;

@Schema()
export class Fund {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  minimumAmount: number;
}

export const FundSchema = SchemaFactory.createForClass(Fund);
