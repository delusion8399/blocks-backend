import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Storage } from './schema/storage.schema';
import { Model } from 'mongoose';
import sanitizeResponse from 'src/utils/sanitize-response';
import { Block } from 'src/block/schema/block.schema';

@Injectable()
export class StorageService {
  constructor(
    @InjectModel(Storage.name) private storageModel: Model<Storage>,
    @InjectModel(Block.name) private blockModel: Model<Block>,
  ) {}

  async create(createStorageDto: CreateStorageDto) {
    const { blockId, collectionId, apiKey, ...data } = createStorageDto;

    const insertQuery = { blockId, collectionId, data };

    try {
      if (apiKey) {
        const protectedBlock = await this.blockModel
          .findOne({ apiKey, isProtected: true })
          .lean();
        if (!protectedBlock) {
          throw new Error('Invalid api key');
        } else if (protectedBlock.blockId !== blockId) {
          throw new Error('Invalid api key');
        }
      } else {
        const block = await this.blockModel.findOne({ blockId }).lean();
        if (block.isProtected) {
          throw new Error('You need an API key to access this block');
        }
        if (!block) {
          throw new Error('Invalid block');
        }
      }

      const response = await this.storageModel.create(insertQuery);
      return sanitizeResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(blockId: string) {
    const response = await this.storageModel
      .find({ blockId })
      .sort({ _id: -1 })
      .lean();
    return sanitizeResponse(response);
  }

  async findOne(documentId: string) {
    const response = await this.storageModel
      .findOne({ _id: documentId })
      .lean();
    return sanitizeResponse(response);
  }

  async findByCollectionId(collectionId: string, blockId: string) {
    const response = await this.storageModel
      .find({ collectionId, blockId })
      .sort({ _id: -1 })
      .lean();

    return sanitizeResponse(response);
  }

  async update(
    { blockId, documentId }: { blockId: string; documentId: string },
    updateStorageDto: UpdateStorageDto,
  ) {
    const response = await this.storageModel.findOne({
      _id: documentId,
      blockId,
    });

    const keysUpdated = Object.keys(updateStorageDto);

    for (const key of keysUpdated) {
      response.data[key] = updateStorageDto[key];
    }

    await response.save();

    return sanitizeResponse(response);
  }

  async remove(documentId: string) {
    const response = await this.storageModel.findOneAndDelete({
      _id: documentId,
    });
    return sanitizeResponse(response);
  }
}
