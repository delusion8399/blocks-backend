import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://delusion8399:delusion8399@cluster0.wrea4gz.mongodb.net/blocks?retryWrites=true&w=majority',
    ),
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
