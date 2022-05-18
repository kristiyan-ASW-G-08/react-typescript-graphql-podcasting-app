import React, { FC } from 'react';
import styles from './index.module.scss';

type FormWrapperProps = React.PropsWithChildren<{}>;
const FormWrapper: FC<FormWrapperProps> = ({ children }) => {
  return <section className={styles.formWrapper}>{children}</section>;
};

export default FormWrapper;
