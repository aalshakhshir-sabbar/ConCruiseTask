import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { QueueHandler } from 'src/utils/sqs-decorator';
import { CreateCustomerEvent } from './create-customer.event';

@EventsHandler(CreateCustomerEvent)
@Injectable()
export class CreateCustomerEventHandler implements IEventHandler<CreateCustomerEvent> {
  constructor() {

  }
  @QueueHandler('create_customer')
  async handle(event: CreateCustomerEvent) {
      console.log("created", event);
  }
}