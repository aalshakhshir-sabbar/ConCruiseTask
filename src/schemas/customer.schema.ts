import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AggregateRoot } from '@nestjs/cqrs';
import { DeletedCustomerEvent } from 'src/Customers/delete-customer.event';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer extends AggregateRoot {
  constructor(readonly id: string) {
    super();
  }
  @Prop()
  name: string;

  @Prop()
  fullName: string;

  @Prop()
  currentLocation: string;

  @Prop()
  numberOfRides: number;

  @Prop()
  rating: number;

  deleteCustomer() {
    this.apply(new DeletedCustomerEvent(this.id));
  }
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
