import * as dotenv from 'dotenv';
dotenv.config();
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule, { rawBody: true });

  const configService = app.get(ConfigService);
  app.enableCors();
  const port: number = configService.get('PORT');

  await app.listen(port);
  logger.log(`listening on port ${port}`);
}
bootstrap();
