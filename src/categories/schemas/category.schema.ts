import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  createdBy: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
