import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const corsOrigin = config.get<string>('CORS_ORIGIN')?.split(',') ?? true;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted : true ,  transform: true }));
  app.enableCors({ origin: corsOrigin, credentials: true });

  const port = config.get<number | string>('PORT') ?? 3000;
  await app.listen(port);
}
bootstrap();
