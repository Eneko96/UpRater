import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RateDocument = Rate & Document;

@Schema()
export class Rate {
  @Prop()
  value: number;
  @Prop({ ref: 'User', type: Types.ObjectId })
  user: string;
  @Prop()
  created_at: Date;
  @Prop()
  anon: boolean;
  @Prop([String])
  reactions: [string];
  @Prop([String])
  topics: [string];
  @Prop()
  how_close: number;
  @Prop()
  comment: string;
}

export const RateSchema = SchemaFactory.createForClass(Rate);

/* 
  // POST example
  {
    "value": 5,
    "created_at": "2020-10-29T12:00:00.000Z",
    "anon": false,
    "reactions": [
      "happy"
    ],
    "topics": [
      "politics"
    ],
    "how_close": 5,
    "comment": "This is a comment"
  }
 */
