import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ ref: 'Rate', type: Types.ObjectId })
  rate_id: ObjectId;

  @Prop({ ref: 'User', type: Types.ObjectId })
  user_id: Types.ObjectId;

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: false })
  reactions: Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
