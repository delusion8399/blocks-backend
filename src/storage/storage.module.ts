import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Storage, StorageSchema } from './schema/storage.schema';
import { Block, BlockSchema } from 'src/block/schema/block.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Storage.name, schema: StorageSchema },
      { name: Block.name, schema: BlockSchema },
    ]),
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
