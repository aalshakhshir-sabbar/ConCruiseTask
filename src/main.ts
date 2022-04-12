#! /usr/bin/env node
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const AWS = require('aws-sdk');
import { AppModule } from './app.module';
import { ExceptionsLoggerFilter } from './utils/exceptionLogger.filter';
import { ValidationErrorFilter } from './utils/validation.error.filter';

const queueUrls = [
  {
    name: 'delete_user_development',
    url: 'http://localhost:4566/000000000000/delete_user_development',
    Attributes: {
      RedrivePolicy:
        '{"deadLetterTargetArn":"arn:aws:sqs:us-east-1:000000000000:deadletterqueue.fifo","maxReceiveCount":"3"}',
    },
  },
  {
    name: 'delete_user',
    url: 'http://localhost:4566/000000000000/delete_user',
    Attributes: {
      RedrivePolicy:
        '{"deadLetterTargetArn":"arn:aws:sqs:us-east-1:000000000000:deadletterqueue.fifo","maxReceiveCount":"3"}',
    },
  },
  {
    name: 'create_customer',
    url: 'http://localhost:4566/000000000000/create_customer',
    Attributes: {
      RedrivePolicy:
        '{"deadLetterTargetArn":"arn:aws:sqs:us-east-1:000000000000:deadletterqueue.fifo","maxReceiveCount":"3"}',
    },
  },
];
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log'],
  });
  const sqs = new AWS.SQS({
    endpoint: process.env.LOCALSTACK_URL,
    accessKeyId: process.env.AWS_ACCOUNT_ID,
    secretAccessKey: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_REGION,
  });
  queueUrls.forEach((item) => {
    sqs.setQueueAttributes(
      { Attributes: item.Attributes, QueueUrl: item.url },
      function (err, data) {
        if (err) {
          console.log('Error', err);
        } else {
          console.log('Success', data);
        }
      },
    );
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
  await app.listen(3001);
}

export const getQueues = () => {
  return queueUrls.map((element) => {
    return {
      name: element.name,
      region: process.env.AWS_REGION,
      queueUrl: element.url,
    };
  });
};
bootstrap();
