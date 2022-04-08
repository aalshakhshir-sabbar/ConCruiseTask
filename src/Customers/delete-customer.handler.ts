import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Customer } from 'src/schemas/customer.schema';
import { DeleteCustomerCommand } from './customer.command';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand>
{
  constructor(
    private publisher: EventPublisher,
  ) {}

  async execute(command: DeleteCustomerCommand) {
    const { customerId } = command;
    const customer: Customer = this.publisher.mergeObjectContext(
        new Customer(customerId)
    )
    customer.deleteCustomer()
    customer.commit();
  }
}
