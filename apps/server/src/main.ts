import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvEnum } from './enums/env.enum';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        stopAtFirstError: true,
      }),
    );
    const configService = app.get(ConfigService);
    const port = parseInt(configService.getOrThrow<string>(EnvEnum.PORT), 10);
    await app.listen(port, () => {
      logger.log(`App started at ${port} port`);
    });
  } catch (e) {
    logger.error(e);
    logger.error(`Unsuccessful attempt to launch application`);
  }
}

bootstrap();
