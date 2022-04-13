import { applyDecorators } from '@nestjs/common';
import {  SqsMessageHandler } from '@ssut/nestjs-sqs';

export function QueueHandler(queue: string) {
    console.log('queue', queue)
    const queueName = queue
    return applyDecorators(SqsMessageHandler(queueName));
}


