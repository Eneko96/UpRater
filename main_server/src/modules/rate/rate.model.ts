import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RateDocument = Rate & Document;

@Schema()
export class Rate {
  _id: Types.ObjectId;
  @Prop()
  value: number;

  @Prop({ ref: 'Profile', type: Types.ObjectId })
  user_from: Types.ObjectId;

  @Prop({ ref: 'Profile', type: Types.ObjectId })
  user_to: Types.ObjectId;

  @Prop({ required: false })
  created_at: Date;

  @Prop()
  anon: boolean;

  @Prop()
  comment: string;

  @Prop()
  reactions_count: number;

  @Prop()
  comments_count: number;

  @Prop({ isFinite: true, min: 0, max: 1, default: 1 })
  weight: number;
}

export const RateSchema = SchemaFactory.createForClass(Rate);
