import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Fund {
  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  minimumAmount: number;
}

export const FundSchema = SchemaFactory.createForClass(Fund);
