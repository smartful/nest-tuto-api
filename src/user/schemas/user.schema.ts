import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: string;

  @Prop({ type: Date, default: Date.now })
  updatedAt: string;

  @Prop()
  email: string;

  @Prop()
  hash: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
