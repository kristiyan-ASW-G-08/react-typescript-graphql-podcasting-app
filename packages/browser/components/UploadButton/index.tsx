import React, { FC, SyntheticEvent, useState, useRef } from 'react';
import Image from 'next/image';
import { ErrorMessage } from 'formik';
import getFile from 'utilities/getFile';
import clickHandler from './clickHandler';
import inputStyles from 'components/Input/index.module.scss';
import styles from './index.module.scss';
import AudioPlayer from '@/components/AudioPlayer';
import imageFileTypes from '@pod/common/source/fileTypes/imageFileTypes';
import audioFileTypes from '@pod/common/source/fileTypes/audioFileTypes';

interface UploadButtonProps {
  name: string;
  setFieldValue: (name: string, value: File) => any;
}

export const UploadButton: FC<UploadButtonProps> = ({
  name,
  setFieldValue,
}) => {
  const [fileUrl, setFileUrl] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showImage, setShowImage] = useState<boolean>(true);
  const [showPlayer, setShowPlayer] = useState<boolean>(true);
  const uploadHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    //@ts-ignore
    const { file, fileUrl } = getFile(e);
    setShowImage(imageFileTypes.includes(file.type));
    setShowPlayer(audioFileTypes.includes(file.type));
    setFileUrl(fileUrl);
    setFieldValue(name, file);
  };
  return (
    <div className={inputStyles.input}>
      {fileUrl && showImage ? <img src={fileUrl} alt="" /> : ''}
      {fileUrl && showPlayer ? <AudioPlayer audioSrc={fileUrl} /> : ''}
      <input
        data-testid="file-input"
        ref={inputRef}
        name={name}
        type="file"
        onChange={uploadHandler}
        hidden
      />
      <button
        className={styles.uploadButton}
        type="button"
        onClick={() => clickHandler(inputRef)}
      >
        Upload
      </button>
      <ErrorMessage component="label" name={name} />
    </div>
  );
};

export default UploadButton;
