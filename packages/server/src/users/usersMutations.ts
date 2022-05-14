import CreateUserDto from '@src/users/CreateUserDto';
import UserType from '@src/types/UserType';
import validationHandler from '@customUtilities/validationHandler';
import UserValidator from '@pod/common/source/schemaValidators/UserValidator';
import createUser from '@src/users/createUser';
import LoginUserDTO from '@src/users/LoginUserDto';
import { UserInputError } from 'apollo-server';
import getUserByEmail from '@src/users/getUserByEmail';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const mutation = {
  createUserMutation: async (
    _: any,
    args: CreateUserDto,
  ): Promise<UserType> => {
    await validationHandler(args, UserValidator);
    return createUser(args);
  },
  loginMutation: async (
    _: any,
    { email, password }: LoginUserDTO,
  ): Promise<{
    username: string;
    email: string;
    token: string;
  }> => {
    const { SECRET } = process.env;
    const user = await getUserByEmail(email);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UserInputError('Validation Error', {
        validationErrors: [
          {
            path: 'password',
            message: 'Wrong password. Try again',
          },
        ],
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      SECRET,
      { expiresIn: '96h' },
    );

    return {
      username: user.username,
      email: user.email,
      token,
    };
  },
};

export default mutation;
