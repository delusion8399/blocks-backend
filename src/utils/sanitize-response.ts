import { Block } from 'src/block/interfaces/block.interfaces';

const sanitizeResponse = (data): Block | Block[] => {
  if (Array.isArray(data)) {
    const sanitizedResponse: Array<Block> = data.map((item) => ({
      _id: item._id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      collectionId: item.collectionId,
      blockId: item.blockId,
      ...item.data,
    }));

    return sanitizedResponse;
  }

  return {
    _id: data._id,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    collectionId: data.collectionId,
    blockId: data.blockId,
    ...data.data,
  };
};

export default sanitizeResponse;
