import React, { FC, SyntheticEvent, useState, useRef } from 'react';
import Image from 'next/image';
import { ErrorMessage } from 'formik';
import getFile from 'utilities/getFile';
import clickHandler from './clickHandler';
import inputStyles from 'components/Input/index.module.scss';
import styles from './index.module.scss';
interface ImageInputProps {
  name: string;
  setFieldValue: (name: string, value: File) => any;
}
export const ImageInput: FC<ImageInputProps> = ({ name, setFieldValue }) => {
  const [fileUrl, setFileUrl] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    //@ts-ignore
    const { file, fileUrl } = getFile(e);
    setFileUrl(fileUrl);
    setFieldValue(name, file);
  };
  return (
    <div className={inputStyles.input}>
      {fileUrl ? <img src={fileUrl} alt="" /> : ''}
      <input
        data-testid="input"
        ref={inputRef}
        name={name}
        type="file"
        onChange={uploadHandler}
        hidden
      />
      <button
        className={styles.imageInputButton}
        type="button"
        onClick={() => clickHandler(inputRef)}
      >
        Upload
      </button>
      <ErrorMessage component="label" name={name} />
    </div>
  );
};

export default ImageInput;
