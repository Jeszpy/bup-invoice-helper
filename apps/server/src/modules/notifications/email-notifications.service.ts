import { Injectable, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
export interface ISendEmailEvent {
  email: string | null;
  pathToInvoice: string;
  fileName: string;
}
@Injectable()
export class EmailNotificationsService {
  constructor(private readonly mailerService: MailerService) {}
  @OnEvent('invoice.created', { async: true })
  public async sendInvoice(eventDto: ISendEmailEvent) {
    await this.sendMailToDir(eventDto);
    if (eventDto.email) {
      await this.sendMailToCustomer(eventDto);
    }
    return;
  }

  private async sendMailToDir(eventDto: ISendEmailEvent) {
    await this.mailerService.sendMail({
      to: 'mikolamazaev@mail.ru',
      template: './send-to-dir.template.hbs',
      attachments: [
        {
          filename: eventDto.fileName,
          path: eventDto.pathToInvoice,
          contentType: 'application/pdf',
        },
      ],
    });
  }

  private async sendMailToCustomer(eventDto: ISendEmailEvent) {
    await this.mailerService.sendMail({
      to: eventDto.email,
      template: './send-to-customer.template.hbs',
      attachments: [
        {
          filename: eventDto.fileName,
          path: eventDto.pathToInvoice,
          contentType: 'application/pdf',
        },
      ],
    });
  }
}
