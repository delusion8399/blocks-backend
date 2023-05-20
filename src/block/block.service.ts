import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Block } from './schema/block.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlockService {
  constructor(@InjectModel(Block.name) private blockModel: Model<Block>) {}

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

  remove(id: string) {
    return this.blockModel.findOneAndDelete({ blockId: id });
  }
}
