import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlockDocument = HydratedDocument<Block>;

@Schema({ timestamps: true })
export class Block {
  @Prop()
  apiKey: string;

  @Prop()
  blockId: string;

  @Prop()
  blockName: string;

  @Prop()
  isProtected: boolean;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
