import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import authorizationHandler from '../authorizationHandler';

jest.spyOn(jwt, 'verify');
describe('authorizationHandler', () => {
  const secret = 'secret';
  const userId = mongoose.Types.ObjectId();
  const token = jwt.sign(
    {
      userId,
    },
    secret,
    { expiresIn: '1h' },
  );
  const authorizationHeader = `bearer ${token}`;
  it('returns user id', () => {
    expect.assertions(4);
    const returnedUserId = authorizationHandler(authorizationHeader, secret);
    expect(jwt.verify).toHaveBeenCalledTimes(1);
    expect(jwt.verify).toHaveBeenCalledWith(token, secret);
    expect(jwt.verify).toHaveReturnedTimes(1);
    expect(returnedUserId).toMatch(userId.toString());
  });
  it('throw an error when the secret is invalid', () => {
    expect.assertions(1);
    expect(() =>
      authorizationHandler(authorizationHeader, 'invalidSecret'),
    ).toThrowErrorMatchingSnapshot();
  });
  it('throw an error when the secret is invalid', () => {
    expect.assertions(1);
    expect(() =>
      authorizationHandler('', secret),
    ).toThrowErrorMatchingSnapshot();
  });
});
