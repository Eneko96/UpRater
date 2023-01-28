import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: string;
  @Prop({ unique: true })
  username: string;
  @Prop()
  password: string;
  @Prop({ ref: 'Rate', type: Types.ObjectId })
  rates: [
    {
      type: Types.ObjectId;
      ref: 'Rate';
    },
  ];
}

export const UserSchema = SchemaFactory.createForClass(User);
