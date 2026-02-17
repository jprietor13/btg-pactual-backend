import { Module } from '@nestjs/common';
import { FundsService } from './funds.service';
import { FundsController } from './funds.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Fund, FundSchema } from 'src/database/schemas/fund.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fund.name, schema: FundSchema }]),
  ],
  providers: [FundsService],
  controllers: [FundsController],
})
export class FundsModule {}
