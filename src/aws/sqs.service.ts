import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const AWS = require('aws-sdk');
import { getQueues } from 'src/main';

@Injectable()
export class AwsSqsService {
  private readonly awsSqs: AWS.SQS;

  constructor(private configService: ConfigService) {
    this.awsSqs = new AWS.SQS({
      endpoint: process.env.LOCALSTACK_URL,
      accessKeyId: process.env.AWS_ACCOUNT_ID,
      secretAccessKey: process.env.AWS_ACCOUNT_ID,
      region: process.env.AWS_REGION,
    });
    (AWS as any).events.on('httpError', function () {
      if (
        this.response.error &&
        ['NetworkingError', 'UnknownEndpoint'].includes(
          this.response.error.code,
        )
      ) {
        this.response.error.retryable = true;
      }
    });
    getQueues().map((i) => ({
      name: i.name,
      queueUrl: `${process.env.LOCALSTACK_URL}${process.env.AWS_ACCOUNT_ID}/${i.name}`,
      sqs: this.awsSqs,
      heartbeatInterval: 10,
      visibilityTimeout: 3600,
    }));
  }

  createQueue(name: string) {
    return this.awsSqs.createQueue({ QueueName: name }).promise();
  }

  async addTopicSendPermission(queue: string, topic: string) {
    const region = this.configService.get('AWS.REGION');
    const accountId = this.configService.get('AWS.ACCOUNT_ID');
    const queueArn = `arn:aws:sqs:${region}:${accountId}:${queue}`;
    const topicArn = `arn:aws:sns:${region}:${accountId}:${topic}`;
    const queueUrl = `${process.env.LOCALSTACK_URL}/${accountId}/${queue}`;
    const attributes = await this.awsSqs
      .getQueueAttributes({ QueueUrl: queueUrl, AttributeNames: ['Policy'] })
      .promise();
    const permission = {
      Sid: `${topicArn}`,
      Effect: 'Allow',
      Principal: {
        AWS: '*',
      },
      Action: ['SQS:SendMessage'],
      Resource: queueArn,
      Condition: {
        ArnEquals: {
          'AWS:SourceArn': topicArn,
        },
      },
    };
    let policy = null;

    if (attributes.Attributes) {
      policy = JSON.parse(attributes.Attributes.Policy);
      if (!policy.Statement.map((s) => s.Sid).includes(permission.Sid)) {
        policy.Statement.push(permission);
      }
    } else {
      policy = {
        Version: '2012-10-17',
        Id: `${queueArn}/SQSDefaultPolicy`,
        Statement: [
          {
            Sid: '__owner_statement',
            Effect: 'Allow',
            Principal: {
              AWS: `arn:aws:iam::${accountId}:root`,
            },
            Action: 'SQS:*',
            Resource: queueArn,
          },
          permission,
        ],
      };
    }

    return this.awsSqs
      .setQueueAttributes({
        QueueUrl: queueUrl,
        Attributes: {
          Policy: JSON.stringify(policy),
        },
      })
      .promise();
  }

  async createDeadQueueForQueue(queue: string) {
    const deadQueueName = queue + '_dead_queue';
    const createdQueue = await this.createQueue(queue + '_dead_queue');
    const region = this.configService.get('AWS.REGION');
    const accountId = this.configService.get('AWS.ACCOUNT_ID');
    const queueUrl = `${process.env.LOCALSTACK_URL}/${accountId}/${queue}`;
    const redrivePolicy = {
      maxReceiveCount: 5,
      deadLetterTargetArn: `arn:aws:sqs:${region}:${accountId}:${deadQueueName}`,
    };

    return this.awsSqs
      .setQueueAttributes({
        QueueUrl: queueUrl,
        Attributes: {
          RedrivePolicy: JSON.stringify(redrivePolicy),
        },
      })
      .promise();
  }
}
