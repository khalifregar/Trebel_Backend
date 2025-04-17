import { NotFoundException } from '@nestjs/common';

export function orNotFound<T>(data: T | null, message = 'Data not found'): T {
  if (!data) {
    throw new NotFoundException(message);
  }
  return data;
}

export function success<T>(data: T, message = 'Success') {
    return {
      status: 'success',
      message,
      data,
    };
  }
  
  export function failed(message = 'Failed') {
    return {
      status: 'error',
      message,
    };
  }
  
