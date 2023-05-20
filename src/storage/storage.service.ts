import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Storage } from './schema/storage.schema';
import { Model } from 'mongoose';
import sanitizeResponse from 'src/utils/sanitize-response';

@Injectable()
export class StorageService {
  constructor(
    @InjectModel(Storage.name) private storageModel: Model<Storage>,
  ) {}

  async create(createStorageDto: CreateStorageDto) {
    const { blockId, collectionId, ...data } = createStorageDto;

    const insertQuery = { blockId, collectionId, data };

    const response = await this.storageModel.create(insertQuery);
    return sanitizeResponse(response);
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
