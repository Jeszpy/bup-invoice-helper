import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

const sleep = async (seconds: number) =>
  new Promise((r) => setTimeout(r, seconds * 1000));

export interface ISendEmailEvent {
  email: string | null;
  pathToInvoice: string;
}
@Injectable()
export class EmailNotificationsService {
  @OnEvent('invoice.created', { async: true })
  public async sendInvoice(eventDto: ISendEmailEvent) {
    console.log('send email', eventDto);
  }

  private async sendMailToDir() {}

  private async sendMailToCustomer() {}
}
