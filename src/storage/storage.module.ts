import { MiddlewareConsumer, Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Storage, StorageSchema } from './schema/storage.schema';
import { Block, BlockSchema } from 'src/block/schema/block.schema';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { BlockService } from 'src/block/block.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Storage.name, schema: StorageSchema },
      { name: Block.name, schema: BlockSchema },
    ]),
  ],
  controllers: [StorageController],
  providers: [StorageService, BlockService],
})
export class StorageModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(StorageController);
  }
}
