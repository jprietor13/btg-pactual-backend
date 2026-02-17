import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { FundsService } from './funds.service';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('funds')
@UseGuards(JwtGuard)
export class FundsController {
  constructor(private readonly fundsService: FundsService) {}

  @Get()
  getAllFunds() {
    return this.fundsService.getAllFunds();
  }

  @Post('subscribe/:fundId')
  subscribe(@Param('fundId') fundId: string, @CurrentUser() user) {
    return this.fundsService.subscribe(user.userId, fundId);
  }

  @Post('cancel/:fundId')
  cancel(@Param('fundId') fundId: string, @CurrentUser() user) {
    return this.fundsService.cancel(user.userId, fundId);
  }

  @Get('transactions')
  getTransactions(@CurrentUser() user) {
    return this.fundsService.getTransactions(user.userId);
  }
}
