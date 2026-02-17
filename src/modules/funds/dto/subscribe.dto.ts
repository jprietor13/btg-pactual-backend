import { IsString } from 'class-validator';

export class SubscribeDto {
  @IsString()
  fundId: string;
}
