import { RefObject } from 'react';

const clickHandler = (inputRef: RefObject<HTMLInputElement>): void => {
  if (inputRef?.current) {
    inputRef.current.click();
  }
};

export default clickHandler;
