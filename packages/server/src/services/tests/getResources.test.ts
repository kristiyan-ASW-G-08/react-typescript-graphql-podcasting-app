import User from '@src/users/UserModel';
import UserType from '@customTypes/UserType';
import getResource from '@services/getResource';

describe('getResources', () => {
  expect.assertions(4);
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.restoreAllMocks());

  it('should call find and select', async () => {
    const select = jest.fn(() => true);
    const findQuery = { name: 'email', value: 'testMail@test' };
    const selectQuery = 'username email';
    const findOneSpy = jest
      .spyOn(User, 'findOne')
      // @ts-ignore
      .mockReturnValue({ select });
    await getResource<UserType>(User, findQuery, selectQuery);

    expect(findOneSpy).toHaveBeenCalledTimes(1);
    expect(findOneSpy).toHaveBeenCalledWith({
      [findQuery.name]: findQuery.value,
    });
    expect(select).toHaveBeenCalledTimes(1);
    expect(select).toHaveBeenCalledWith(selectQuery);
  });
  it('should throw an error if find and select resolve to falsy value', async () => {
    expect.assertions(1);
    const select = jest.fn(() => false);
    const findQuery = { name: 'email', value: 'testMail@test' };
    const selectQuery = 'username email';
    const findOneSpy = jest
      .spyOn(User, 'findOne')
      // @ts-ignore
      .mockReturnValue({ select });

    await expect(
      getResource<UserType>(User, findQuery, selectQuery),
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
