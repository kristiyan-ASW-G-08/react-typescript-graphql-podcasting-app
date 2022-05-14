import React, { FC } from 'react';
import { FastField, ErrorMessage } from 'formik';
import styles from './index.module.scss';

interface InputProps {
  name: string;
  placeholder: string;
  type: string;
  component?: 'input' | 'textarea';
}

export const Input: FC<InputProps> = ({
  name,
  placeholder,
  type,
  component = 'input',
}) => (
  <div className={styles.input}>
    <FastField
      name={name}
      type={type}
      placeholder={placeholder}
      component={component}
    />
    <ErrorMessage component="label" name={name} />
  </div>
);

export default Input;
