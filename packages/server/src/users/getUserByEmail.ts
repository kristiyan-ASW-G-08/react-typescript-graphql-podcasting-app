import UserModel from '@src/users/UserModel';
import UserType from '@src/types/UserType';
import { UserInputError } from 'apollo-server';
import getResource from '../services/getResource';

const getUserByEmail = async (email: string): Promise<UserType> =>
  getResource<UserType>(
    UserModel,
    { name: 'email', value: email },
    new UserInputError('Validation Error', {
      validationErrors: [
        {
          path: 'email',
          message: `${email} is not found. Try again`,
        },
      ],
    }),
    '',
  );
export default getUserByEmail;
