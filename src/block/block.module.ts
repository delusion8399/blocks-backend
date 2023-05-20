import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockSchema, Block } from './schema/block.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }]),
  ],
  controllers: [BlockController],
  providers: [BlockService],
})
export class BlockModule {}
