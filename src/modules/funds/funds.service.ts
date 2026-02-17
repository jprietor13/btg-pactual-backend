import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Fund, FundDocument } from '../../database/schemas/fund.schema';
import {
  Transaction,
  TransactionDocument,
} from '../../database/schemas/transaction.schema';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class FundsService {
  constructor(
    @InjectModel(Fund.name)
    private fundModel: Model<FundDocument>,
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
  ) {}

  async getAllFunds() {
    return this.fundModel.find();
  }

  async subscribe(userId: string, fundId: string) {
    const user = await this.usersService.findById(userId);
    const fund = await this.fundModel.findById(fundId);

    if (!fund) throw new NotFoundException('Fund not found');

    if (user.balance < fund.minimumAmount) {
      throw new BadRequestException(
        `No tiene saldo disponible para vincularse al fondo ${fund.name}`,
      );
    }

    user.balance -= fund.minimumAmount;
    await user.save();

    await this.transactionModel.create({
      transactionId: uuidv4(),
      userId,
      fundId,
      type: 'SUBSCRIBE',
      amount: fund.minimumAmount,
    });

    await this.notificationsService.notify(user, fund, 'SUBSCRIBE');

    return { message: 'Subscribed successfully' };
  }

  async cancel(userId: string, fundId: string) {
    const user = await this.usersService.findById(userId);
    const fund = await this.fundModel.findById(fundId);

    if (!fund) throw new NotFoundException('Fund not found');

    user.balance += fund.minimumAmount;
    await user.save();

    await this.transactionModel.create({
      transactionId: uuidv4(),
      userId,
      fundId,
      type: 'CANCEL',
      amount: fund.minimumAmount,
    });

    await this.notificationsService.notify(user, fund, 'CANCEL');

    return { message: 'Subscription cancelled successfully' };
  }

  async getTransactions(userId: string) {
    return this.transactionModel.find({ userId });
  }
}

