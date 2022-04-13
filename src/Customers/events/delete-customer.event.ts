
export class DeletedCustomerEvent {
    constructor(
      public readonly customerId: string,
    ) {
    }
  }