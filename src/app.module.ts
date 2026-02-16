import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { FundsModule } from './modules/funds/funds.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { AuthModule } from './modules/auth/auth.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [UsersModule, FundsModule, TransactionsModule, AuthModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
