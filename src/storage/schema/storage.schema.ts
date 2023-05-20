import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Block } from 'src/block/schema/block.schema';

export type StorageDocument = HydratedDocument<Storage>;

@Schema({ timestamps: true })
export class Storage {
  @Prop({ required: true })
  blockId: string;

  @Prop()
  collectionId: string;

  @Prop({ required: true })
  data: mongoose.Schema.Types.Mixed;
}

export const StorageSchema = SchemaFactory.createForClass(Storage);

StorageSchema.index({ blockId: 1, collectionId: 1 }, { unique: true });
