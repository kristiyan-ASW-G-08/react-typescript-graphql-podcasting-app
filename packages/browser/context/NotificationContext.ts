import { createContext } from 'react';

export interface Notification {
  content: string;
  type: 'message' | 'warning';
}

export const defaultNotification: Notification = {
  type: 'warning',
  content: 'Something went wrong!!!!',
};

export default createContext<any>(null);
