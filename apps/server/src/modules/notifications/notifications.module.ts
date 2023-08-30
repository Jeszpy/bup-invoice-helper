import { Module } from '@nestjs/common';
import { EmailNotificationsService } from './email-notifications.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerModuleConfig } from '../../configs/mailer-module.config';

@Module({
  imports: [MailerModule.forRootAsync({ useClass: MailerModuleConfig })],
  providers: [EmailNotificationsService],
})
export class NotificationsModule {}
