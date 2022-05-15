import React, { FC } from 'react';
import styles from './index.module.scss';

type FieldsWrapperProps = React.PropsWithChildren<{}>;
const FieldsWrapper: FC<FieldsWrapperProps> = ({ children }) => {
  return <div className={styles.fieldsWrapper}>{children}</div>;
};

export default FieldsWrapper;
