import { Injectable } from '@nestjs/common';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { EnvEnum } from '../enums/env.enum';

@Injectable()
export class MailerModuleConfig implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {
    console.log(join(__dirname, '../modules/notifications/templates'));
  }
  createMailerOptions(): MailerOptions {
    console.log(this.configService.get(EnvEnum.MAILER_USER));
    console.log(this.configService.get(EnvEnum.MAILER_PASSWORD));
    return {
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        ignoreTLS: true,
        auth: {
          user: this.configService.get(EnvEnum.MAILER_USER),
          pass: this.configService.get(EnvEnum.MAILER_PASSWORD),
        },
      },
      defaults: {
        from: 'ОДО "Белукрпром"',
        subject: 'Счёт-фактура',
      },
      template: {
        dir: join(__dirname, '../modules/notifications/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
