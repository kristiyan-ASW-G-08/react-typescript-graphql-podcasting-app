import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import { boolean } from 'yup';
import styles from './index.module.scss';
import logo from '../../assets/logo-default.svg';

interface UploadButtonProps {
  src: string;
}

const UploadButtonPlayer: FC<UploadButtonProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState(new Audio(src));
  const [currentTime, setCurrentTime] = useState<number>(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const updateProgress = ({ currentTarget }: Event) => {
    if (progressRef) {
      //@ts-ignore
      const { duration, currentTime } = currentTarget;
      const progressPercent = ((currentTime / duration) * 100).toFixed(1);
      //@ts-ignore
      progressRef.current.style.width = `${progressPercent}%`;
      //@ts-ignore
      setCurrentTime(progressPercent);
    }
  };
  audio.addEventListener('timeupdate', updateProgress);
  const progressContainerClick = (e: Event) => {
    //@ts-ignore
    const width = e.currentTarget.clientWidth;
    //@ts-ignore
    const clickX = e.offsetX;
    const duration = audio.duration;
    console.log(width, clickX);
    audio.currentTime = (clickX / width) * duration;
  };

  const backward = () => {
    const { currentTime } = audio;
    audio.currentTime = currentTime - 30;
  };

  const forward = () => {
    const { currentTime } = audio;
    audio.currentTime = currentTime + 30;
  };
  useEffect(() => {
    if (progressContainerRef.current) {
      //@ts-ignore
      progressContainerRef.current.addEventListener(
        'click',
        progressContainerClick,
      );
    }
    return () => {
      //@ts-ignore
      if (progressContainerRef.current) {
        progressContainerRef.current.removeEventListener(
          'click',
          progressContainerClick,
        );
      }

      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [progressContainerRef.current]);
  const audioHandler = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    } else {
      setIsPlaying(true);
      audio.play();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <div className={`${styles.logo} ${isPlaying ? styles.running : ''}`}>
          <Image
            src={logo ? logo : ''}
            height={20}
            width={40}
            alt="PodCasting Logo"
          />
        </div>
      </div>
      <div className={styles.progressContainer} ref={progressContainerRef}>
        <p className={styles.progress} ref={progressRef}>
          {currentTime}%
        </p>
      </div>
      <div className={styles.buttonsContainer}>
        <button type="button" onClick={backward} className={styles.button}>
          <FontAwesomeIcon icon="backward" />
        </button>
        <button
          type="button"
          onClick={audioHandler}
          className={`${styles.button} ${isPlaying ? styles.active : ''}`}
        >
          {isPlaying ? (
            <FontAwesomeIcon icon="pause" />
          ) : (
            <FontAwesomeIcon icon="play" />
          )}
        </button>
        <button type="button" onClick={forward} className={styles.button}>
          <FontAwesomeIcon icon="forward" />
        </button>
      </div>
    </div>
  );
};

export default UploadButtonPlayer;
