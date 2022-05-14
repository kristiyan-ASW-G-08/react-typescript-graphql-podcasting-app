import ValidationError from '@pod/common/source/types/ValidationError';
import {
  Notification,
  defaultNotification,
} from '@/context/NotificationContext';
import { FormikErrors, FormikValues } from 'formik';
import transformValidationErrors from './transformValidationErrors';

type setErrors = (validationErrors: FormikErrors<FormikValues>) => void;
type setNotification = (notification: Notification) => {};

const formErrorHandler = (
  err: any,
  setErrors: setErrors,
  setNotification: setNotification,
) => {
  if (err?.graphQLErrors !== undefined) {
    if (err.graphQLErrors[0]?.extensions?.validationErrors !== undefined) {
      const { validationErrors } = err.graphQLErrors[0]?.extensions;
      setErrors(transformValidationErrors(validationErrors));
    } else {
      setNotification(defaultNotification);
    }
  }
};

export default formErrorHandler;
