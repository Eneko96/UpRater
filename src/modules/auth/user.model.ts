import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: ObjectId;

  @Prop({
    match:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true,
    unique: true,
  })
  email: string;
  @Prop()
  password: string;
  // @Prop({ ref: 'Rate', type: Types.ObjectId })
  // rates: [
  //   {
  //     type: Types.ObjectId;
  //     ref: 'Rate';
  //   },
  // ];
}

export const UserSchema = SchemaFactory.createForClass(User);
