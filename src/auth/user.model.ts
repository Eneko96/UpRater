import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: ObjectId;
  @Prop({ unique: true })
  username: string;
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
