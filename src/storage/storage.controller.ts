import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';

@Controller()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post(':blockId')
  create(
    @Body() createStorageDto: CreateStorageDto,
    @Param() { blockId }: { blockId: string },
  ) {
    return this.storageService.create({
      ...createStorageDto,
      blockId,
    });
  }

  @Get(':blockId')
  findAll(@Param() { blockId }: { blockId: string }) {
    return this.storageService.findAll(blockId);
  }

  @Get(':blockId/document/:documentId')
  findOne(@Param('documentId') documentId: string) {
    return this.storageService.findOne(documentId);
  }

  @Get(':blockId/collection/:collectionId')
  findByCollectionId(
    @Param('collectionId') collectionId: string,
    @Param('blockId') blockId: string,
  ) {
    return this.storageService.findByCollectionId(collectionId, blockId);
  }

  @Patch(':blockId/document/:documentId')
  update(
    @Param('blockId') blockId: string,
    @Param('documentId') documentId: string,
    @Body() updateStorageDto: UpdateStorageDto,
  ) {
    return this.storageService.update(
      { blockId, documentId },
      updateStorageDto,
    );
  }

  @Delete(':blockId/document/:documentId')
  remove(@Param('documentId') documentId: string) {
    return this.storageService.remove(documentId);
  }
}
