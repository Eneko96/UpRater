import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ ref: 'Rate', type: Types.ObjectId })
  rate_id: Types.ObjectId;

  @Prop({ ref: 'User', type: Types.ObjectId })
  user_id: Types.ObjectId;

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: false })
  reactions: Types.ObjectId[];

  @Prop({ required: false })
  sentiment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
