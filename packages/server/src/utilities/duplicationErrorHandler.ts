import { NextFunction } from 'express';
import { Document } from 'mongoose';
import ValidationError from '@pod/common/source/types/ValidationError';
import { UserInputError } from 'apollo-server';
import logger from './logger';

const duplicationErrorHandler = (
  duplicationErrors: any,
  doc: Document,
  next: NextFunction,
): void => {
  if (duplicationErrors.errors) {
    const validationErrors: ValidationError[] = Object.values(
      duplicationErrors.errors,
    ).map(
      // @ts-ignore
      ({ value, path }: { value: string; path: string }): ValidationError => ({
        path,
        message: `${value} is already taken`,
      }),
    );
    throw new UserInputError('Validation Error', {
      validationErrors,
    });
  } else {
    next();
  }
};
export default duplicationErrorHandler;
