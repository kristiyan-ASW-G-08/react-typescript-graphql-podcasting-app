import { Document } from 'mongoose';
import duplicationErrorHandler from '@customUtilities/duplicationErrorHandler';

describe('duplicationErrorHandler', (): void => {
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.restoreAllMocks());
  it('should call next with UserInputError with  an array of validation errors', (): void => {
    // expect.assertions(2);
    const nextMock = jest.fn();
    const value = 'TestUser';
    const path = 'username';
    const mongooseDuplicationError = {
      errors: {
        username: {
          value,
          path,
        },
      },
    };
    const documentMock = ({} as unknown) as Document;
    expect(() =>
      duplicationErrorHandler(mongooseDuplicationError, documentMock, nextMock),
    ).toThrowErrorMatchingSnapshot();
  });
});
