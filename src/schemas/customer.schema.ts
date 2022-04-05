import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
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
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
