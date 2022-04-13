import { Global, Module } from '@nestjs/common';
import { SnsService } from './sns.service';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { AwsSqsService } from './sqs.service';

@Global()
@Module({
  providers: [SnsService, AwsSqsService, ConfigService],
  exports: [SnsService, AwsSqsService],
})
export class AwsModule {
  constructor(private configService: ConfigService) {
    AWS.config.update({
      region: this.configService.get('AWS.AWS_REGION'),
    });
  }
}
