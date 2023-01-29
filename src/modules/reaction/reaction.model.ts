import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type ReactionDocument = Reaction & Document;

@Schema()
export class Reaction extends Document {
  _id?: ObjectId;
  @Prop({ ref: 'Comment' || 'Rate', type: Types.ObjectId })
  parent_id: ObjectId;

  @Prop({ ref: 'User', type: Types.ObjectId })
  user_id: ObjectId;

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: true })
  reaction: string;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);
