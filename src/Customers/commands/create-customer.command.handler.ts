import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Customer } from 'src/schemas/customer.schema';
import { CreateCustomerCommand } from './create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerCommandHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    private publisher: EventPublisher,
  ) {}

  async execute(command: CreateCustomerCommand) {
    const { customerId } = command;
    const customer: Customer = this.publisher.mergeObjectContext(
        new Customer(customerId)
    )
    customer.deleteCustomer()
    customer.commit();
  }
}
