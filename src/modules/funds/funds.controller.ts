import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { FundsService } from './funds.service';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Funds')
@ApiBearerAuth()
@Controller('funds')
@UseGuards(JwtGuard)
export class FundsController {
  constructor(private readonly fundsService: FundsService) {}

  @ApiOperation({ summary: 'Obtener todos los fondos disponibles' })
  @Get()
  getAllFunds() {
    return this.fundsService.getAllFunds();
  }

  @ApiOperation({ summary: 'Subscribirse a un fondo' })
  @Post('subscribe/:fundId')
  subscribe(@Param('fundId') fundId: string, @CurrentUser() user) {
    return this.fundsService.subscribe(user.userId, fundId);
  }

  @ApiOperation({ summary: 'Cancelar una suscripcion' })
  @Post('cancel/:fundId')
  cancel(@Param('fundId') fundId: string, @CurrentUser() user) {
    return this.fundsService.cancel(user.userId, fundId);
  }

  @ApiOperation({ summary: 'Obtener historial de transacciones' })
  @Get('transactions')
  getTransactions(@CurrentUser() user) {
    return this.fundsService.getTransactions(user.userId);
  }
}
