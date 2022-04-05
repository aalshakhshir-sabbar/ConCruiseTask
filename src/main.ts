#! /usr/bin/env node
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionsLoggerFilter } from './utils/exceptionLogger.filter';
import { ValidationErrorFilter } from './utils/validation.error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log'],
  });

  const config = new DocumentBuilder()
    .setTitle('ConCruise api')
    .setDescription('find customers and drivers easily')
    .setVersion('1.0')
    .addTag('ConCruise')
    .addBearerAuth()
    .build();

  app.useGlobalPipes(new ValidationPipe());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new ExceptionsLoggerFilter(httpAdapter),
    new ValidationErrorFilter(),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
