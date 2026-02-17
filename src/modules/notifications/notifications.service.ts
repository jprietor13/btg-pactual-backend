import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  async notify(user, fund, type: string) {
    console.log(
      `[NOTIFICATION] ${type} - User: ${user.email} - Fund: ${fund.name}`,
    );
  }
}
