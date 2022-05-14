import React, { FC } from 'react';
import styles from './index.module.scss';

type FormWrapperProps = React.PropsWithChildren<{}>;
const FormWrapper: FC<FormWrapperProps> = ({ children }) => {
  return <div className={styles.formWrapper}>{children}</div>;
};

export default FormWrapper;
