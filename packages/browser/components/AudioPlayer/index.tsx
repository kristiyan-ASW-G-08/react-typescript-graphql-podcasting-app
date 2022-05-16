import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { FC, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { boolean } from 'yup';
import styles from './index.module.scss';
import logo from '../../assets/logo-default.svg';

interface UploadButtonProps {
  audioSrc: string;
  coverSrc?: string | undefined;
  fixed?: boolean;
}

const UploadButtonPlayer: FC<UploadButtonProps> = ({
  audioSrc,
  coverSrc,
  fixed = false,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState(new Audio(audioSrc));
  const [currentTime, setCurrentTime] = useState<number>(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const setSpeed = ({ target: { value } }: SyntheticEvent) => {
    audio.playbackRate = Number(value);
  };
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
    <div className={`${styles.container} ${fixed ? styles.fixed : ''}`}>
      <div className={styles.logoContainer}>
        <div className={`${styles.logo} ${isPlaying ? styles.running : ''}`}>
          {coverSrc ? (
            <Image
              className={'img'}
              layout="fill"
              objectFit="cover"
              src={coverSrc ? coverSrc : ''}
              alt="Podcast Cover"
            />
          ) : (
            <Image
              className={'logo'}
              height={30}
              width={30}
              src={logo}
              alt="PodCasting Logo"
            />
          )}
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
        <select name="speed" className={styles.button} onChange={setSpeed}>
          <option value="1">1x</option>
          <option value="2">1.5x</option>
          <option value="3">2x</option>
        </select>
      </div>
    </div>
  );
};

export default UploadButtonPlayer;
