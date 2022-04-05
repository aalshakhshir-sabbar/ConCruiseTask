import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class User extends Document {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
