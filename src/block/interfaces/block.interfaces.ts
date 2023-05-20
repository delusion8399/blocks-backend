export interface Block {
  _id: string | any;
  blockId: string;
  collectionId: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlockOptions {
  sort: string;
  limit: number;
  skip: number;
  query: Record<string, unknown>;
}
