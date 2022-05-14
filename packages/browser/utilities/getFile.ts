import { SyntheticEvent } from 'react';

const getFile = (
  e: SyntheticEvent<HTMLInputElement>,
  //@ts-ignore
): { file: File; fileUrl: string } => {
  const target = e.target as HTMLInputElement;
  if ((target.files as FileList).length !== 0) {
    const file: File = (target.files as FileList)[0];
    const fileUrl = window.URL.createObjectURL(file);
    return { file, fileUrl };
  }
};

export default getFile;
