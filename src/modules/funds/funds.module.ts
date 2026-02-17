import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Fund, FundSchema } from '../../database/schemas/fund.schema';
import {
  Transaction,
  TransactionSchema,
} from '../../database/schemas/transaction.schema';
import { FundsService } from './funds.service';
import { FundsController } from './funds.controller';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Fund.name, schema: FundSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    UsersModule,
    NotificationsModule,
  ],
  controllers: [FundsController],
  providers: [FundsService],
})
export class FundsModule {}
