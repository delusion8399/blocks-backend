import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BlockModule } from './block/block.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [DatabaseModule, BlockModule, StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
