import { FC } from 'react';
import styles from './index.module.scss';

interface FormButtonProps {
  text: string;
  loading: boolean;
}

const FormButton: FC<FormButtonProps> = ({ text, loading }) => (
  <button className={styles.formButton} type="submit">
    {loading ? (
      <div className={styles.loader} data-testid="loader"></div>
    ) : (
      <span data-testid="text">{text}</span>
    )}
  </button>
);

export default FormButton;
