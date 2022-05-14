import mongoose from 'mongoose';
import User from '@src/users/UserModel';
import UserType from '@customTypes/UserType';
import connectToDB from '@customUtilities/connectToDB';

describe('UserModel', (): void => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const username = 'username';
  const email = 'testEmail@mail.com';
  const password = 'testPassword';
  beforeAll(
    async (): Promise<void> => {
      await connectToDB(mongoURI);
      await User.deleteMany({}).exec();
    },
  );
  afterEach(
    async (): Promise<void> => {
      await User.deleteMany({}).exec();
    },
  );
  afterAll(
    async (): Promise<void> => {
      await mongoose.disconnect();
    },
  );
  it('should throw an error when validation is not passed', async () => {
    expect.assertions(2);
    const userObj = {
      username,
      email,
      password,
    };
    await User.insertMany([userObj]);
    const user = new User(userObj);
    await expect(user.save()).rejects.toThrowError();
    expect(user.validate).toThrowError();
  });
  it('should create a new user when validation is successful', async (): Promise<
    void
  > => {
    expect.assertions(6);

    const user: UserType = new User({
      username,
      email,
      password,
    });
    await expect(user.save()).resolves.not.toThrowError();
    expect(user).toMatchObject({
      username,
      email,
      password,
    });
    expect(user.username).toBe(username);
    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
  });
});
