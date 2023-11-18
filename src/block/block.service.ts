import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Block } from './schema/block.schema';
import { Storage } from 'src/storage/schema/storage.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlockService {
  constructor(
    @InjectModel(Block.name) private blockModel: Model<Block>,
    @InjectModel(Storage.name) private storageModel: Model<Storage>,
  ) {}

  create(createBlockDto: CreateBlockDto) {
    return this.blockModel.create(createBlockDto);
  }

  findAll() {
    return this.blockModel.find({});
  }

  findOne(id: string) {
    return this.blockModel.findOne({ _id: id });
  }

  update(id: string, updateBlockDto: UpdateBlockDto) {
    return this.blockModel.findOneAndUpdate({ _id: id }, updateBlockDto);
  }

  async remove(id: string) {
    await this.storageModel.deleteMany({ blockId: id });
    const block = await this.blockModel.findOneAndDelete({ blockId: id });
    return block;
  }
}
