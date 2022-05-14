import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import createUser from '@src/users/createUser';
import connectToDB from '@customUtilities/connectToDB';
import UserModel from '@src/users/UserModel';
import CreateUserDto from '../CreateUserDto';

describe('createUser', (): void => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const username = 'username';
  const email = 'testEmail@mail.com';
  const password = 'testPassword';
  beforeAll(
    async (): Promise<void> => {
      await connectToDB(mongoURI);
      await UserModel.deleteMany({}).exec();
    },
  );
  afterEach(
    async (): Promise<void> => {
      await UserModel.deleteMany({}).exec();
    },
  );
  afterAll(
    async (): Promise<void> => {
      await mongoose.disconnect();
    },
  );

  it('should create a new user', async (): Promise<void> => {
    expect.assertions(3);
    const createUserDto: CreateUserDto = {
      username,
      email,
      password,
      confirmPassword: password,
    };
    await createUser(createUserDto);
    const user = await UserModel.findOne({ email });
    if (user !== null) {
      expect(user.username).toBe(username);
      expect(user.email).toBe(email);
      expect(await bcrypt.compare(password, user.password)).toBeTruthy();
    }
  });
  it('should throw an error when validation is not passed', async () => {
    expect.assertions(1);
    const userObj = {
      username,
      email,
      password,
    };
    await UserModel.insertMany([userObj]);
    // @ts-ignore
    await expect(createUser(userObj)).rejects.toThrowError();
  });
});
