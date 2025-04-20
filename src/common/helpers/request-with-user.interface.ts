import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    sub: string;
    [key: string]: any;
  };
}
