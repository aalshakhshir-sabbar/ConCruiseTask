import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { QueueHandler } from 'src/utils/sqs-decorator';
import { DeletedCustomerEvent } from './delete-customer.event';

@EventsHandler(DeletedCustomerEvent)
@Injectable()
export class DeletedCustomerEventHandler implements IEventHandler<DeletedCustomerEvent> {
  constructor() {

  }
  @QueueHandler('customer')  
  async handle(event: DeletedCustomerEvent) {
      console.log("DELETED", event);
  }
}