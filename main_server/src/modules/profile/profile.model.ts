import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  _id: Types.ObjectId;
  @Prop({ unique: true })
  username: string;
  @Prop()
  city: string;
  @Prop()
  bio: string;
  @Prop({ type: Number, min: 0, max: 120 })
  age: number;
  @Prop()
  linktree: string;
  @Prop({ default: 0 })
  c_rates: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
