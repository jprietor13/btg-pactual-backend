import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';

export enum NotificationPreference {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(NotificationPreference)
  notificationPreference?: NotificationPreference;
}
