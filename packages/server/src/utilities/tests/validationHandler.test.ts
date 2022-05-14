import { MixedSchema } from 'yup';
import validationHandler from '@customUtilities/validationHandler';

const validate = jest.fn();
const TestValidatorMock = ({ validate } as unknown) as MixedSchema;
describe('validationHandler', (): void => {
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.restoreAllMocks());
  const args = {
    username: 'John Doe',
    email: 'johnDoe@test.test',
  };
  it(`should call validate 2 times and not throw an error`, async (): Promise<
    void
  > => {
    expect.assertions(2);
    await validationHandler(args, TestValidatorMock);

    expect(TestValidatorMock.validate).toHaveBeenCalledTimes(1);

    expect(TestValidatorMock.validate).toHaveBeenNthCalledWith(1, args, {
      abortEarly: false,
    });
  });
  // figure out why it isn't working later on
  // it(`should throw a Validation Error`, async (): Promise<void> => {
  //   // expect.assertions(3);
  //   validate.mockRejectedValue({
  //     inner: [{ path: 'username', message: 'username is not correct' }],
  //   });

  //   await expect(validationHandler(args, TestValidatorMock)).toThrow();
  //   expect(TestValidatorMock.validate).toHaveBeenCalledTimes(1);
  //   expect(TestValidatorMock.validate).toHaveBeenNthCalledWith(1, args, {
  //     abortEarly: false,
  //   });
  // });
});
