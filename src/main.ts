#! /usr/bin/env node
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log']
  });

  const config = new DocumentBuilder()
  .setTitle('ConCruise api')
  .setDescription('find customers and drivers easily')
  .setVersion('1.0')
  .addTag('ConCruise')
  .build();



  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
