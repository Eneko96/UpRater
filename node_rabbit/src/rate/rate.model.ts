import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RateDocument = Rate & Document;

@Schema()
export class Rate {
  _id: Types.ObjectId;
  @Prop()
  value: number;
  @Prop({ ref: 'User', type: Types.ObjectId })
  user_from: Types.ObjectId;
  @Prop({ ref: 'User', type: Types.ObjectId })
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
  @Prop()
  sentiment: string;
  // @Prop()
  // how_close: number;
}

export const RateSchema = SchemaFactory.createForClass(Rate);
