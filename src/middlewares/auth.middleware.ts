import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export interface ApiKeyRequest extends Request {
  apiKey: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: ApiKeyRequest, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'] as string;
    if (apiKey) {
      req.apiKey = apiKey;
      next();
    } else {
      next();
    }
  }
}
