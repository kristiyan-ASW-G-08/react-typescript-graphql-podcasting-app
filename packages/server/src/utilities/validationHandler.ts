import { ValidationError, MixedSchema } from 'yup';
import { UserInputError } from 'apollo-server';
import CustomValidationError from '@pod/common/source/types/ValidationError';

const validationHandler = async <T>(
  args: T,
  validator: MixedSchema,
): Promise<any> => {
  try {
    await validator.validate(args, { abortEarly: false });
  } catch (error) {
    // @ts-ignore
    if (error.errors && error.inner) {
      // @ts-ignore
      const validationErrors = error.inner.map(
        ({ path, message }: ValidationError): CustomValidationError => ({
          path,
          message,
        }),
      );
      throw new UserInputError('Validation Errors', {
        validationErrors,
      });
    }
  }
};

export default validationHandler;
