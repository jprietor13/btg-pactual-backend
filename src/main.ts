import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Fund } from './database/schemas/fund.schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const fundModel = app.get(getModelToken(Fund.name));

  const count = await fundModel.countDocuments();
  if (count === 0) {
    await fundModel.insertMany([
      { name: 'FPV_BTG_PACTUAL_RECAUDADORA', category: 'FPV', minimumAmount: 75000 },
      { name: 'FPV_BTG_PACTUAL_ECOPETROL', category: 'FPV', minimumAmount: 125000 },
      { name: 'DEUDAPRIVADA', category: 'FIC', minimumAmount: 50000 },
      { name: 'FDO-ACCIONES', category: 'FIC', minimumAmount: 250000 },
      { name: 'FPV_BTG_PACTUAL_DINAMICA', category: 'FPV', minimumAmount: 100000 },
    ]);
    console.log('Funds seeded');
  }
}
bootstrap();
