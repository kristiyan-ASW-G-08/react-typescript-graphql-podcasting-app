import getUserByEmail from '@src/users/getUserByEmail';
import User from '@src/users/UserModel';
import getResource from '@services/getResource';

jest.mock('@services/getResource');

const getResourceMock = getResource as jest.MockedFunction<typeof getResource>;
describe('getUserByEmail', (): void => {
  it(`should call getResource`, async (): Promise<void> => {
    const email = 'testmail@mail.com';
    expect.assertions(2);
    await getUserByEmail(email);

    expect(getResource).toHaveBeenCalledTimes(1);
    expect(getResourceMock).toHaveBeenCalledWith(User, {
      name: 'email',
      value: email,
    });
  });
});
