import CreateUserDto from '@src/users/CreateUserDto';
import UserModel from '@src/users/UserModel';
import UserType from '@customTypes/UserType';
import bcrypt from 'bcryptjs';

const createUser = async ({
  username,
  email,
  password,
}: CreateUserDto): Promise<UserType> => {
  const user = await new UserModel({
    username,
    email,
    password: await bcrypt.hash(password, 12),
  }).save();

  return user;
};

export default createUser;
