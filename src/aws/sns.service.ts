import { Injectable } from '@nestjs/common';
const AWS = require('aws-sdk');

@Injectable()
export class SnsService {
  private readonly awsSns;

  constructor() {
    this.awsSns = new AWS.SNS({
      endpoint: process.env.LOCALSTACK_URL,
      accessKeyId: process.env.AWS_ACCOUNT_ID,
      secretAccessKey: process.env.AWS_ACCOUNT_ID,
      region: process.env.AWS_REGION,
    });
    this.createSqsSubscription('customer', 'customer');
    this.createSqsSubscription('create_customer', 'create_customer');
  }

  publish(topic: string, event: any) {
    const region = process.env.AWS_REGION;
    const accountId = process.env.AWS_ACCOUNT_ID;
    const TopicArn = `arn:aws:sns:${region}:${accountId}:${topic}`;
    const awsMessage: AWS.SNS.PublishInput = {
      TopicArn,
      Message: JSON.stringify(event),
      MessageAttributes: {
        event: {
          DataType: 'String',
          StringValue: event.constructor.name,
        },
      },
    };
    return this.awsSns.publish(awsMessage).promise();
  }

  createTopic(name: string) {
    return this.awsSns.createTopic({ Name: name }).promise();
  }

  async createSqsSubscription(
    topic: string,
    queue: string,
    filterPolicy?: any,
  ) {
    await this.createTopic('customer');
    await this.createTopic('create_customer');
    const region = process.env.AWS_REGION;
    const accountId = process.env.AWS_ACCOUNT_ID;
    const TopicArn = `arn:aws:sns:${region}:${accountId}:${topic}`;
    const Endpoint = `arn:aws:sqs:${region}:${accountId}:${queue}`;
    let Attributes = null;

    if (filterPolicy) {
      Attributes = { FilterPolicy: JSON.stringify(filterPolicy) };
    }

    const subscriptions = await this.awsSns
      .listSubscriptionsByTopic({ TopicArn })
      .promise();
    const subscription = await subscriptions.Subscriptions.find(
      (s) => s.Endpoint === Endpoint,
    );

    if (subscription && Attributes) {
      return this.awsSns
        .setSubscriptionAttributes({
          SubscriptionArn: subscription.SubscriptionArn,
          AttributeName: 'FilterPolicy',
          AttributeValue: Attributes.FilterPolicy,
        })
        .promise();
    }

    return this.awsSns
      .subscribe({
        TopicArn,
        Protocol: 'sqs',
        Endpoint,
        Attributes,
      })
      .promise();
  }
}
