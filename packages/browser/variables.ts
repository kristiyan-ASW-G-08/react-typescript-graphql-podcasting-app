import { makeVar } from '@apollo/client';
import UserData from './types/UserData';

const defaultUserData = { username: '', email: '', token: '', userId: '' };
const tokenVar =
  typeof window !== 'undefined'
    ? makeVar<string>(localStorage.getItem('token') as string)
    : makeVar<string>('');
const userDataVar =
  typeof window !== 'undefined'
    ? makeVar<UserData>(
        //@ts-ignore
        JSON.parse(localStorage.getItem('userData')) as UserData,
      )
    : makeVar<UserData>(
        //@ts-ignore
        defaultUserData,
      );

export { userDataVar, tokenVar, defaultUserData };
