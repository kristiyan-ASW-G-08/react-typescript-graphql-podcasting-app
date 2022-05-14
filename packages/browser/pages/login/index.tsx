import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import HeadLayout from '@/components/HeadLayout';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { tokenVar, userDataVar } from '../../variables';
import Input from '@/components/Input';
import FormWrapper from '@/components/FormWrapper';
import FieldsWrapper from '@/components/FieldsWrapper';
import FormButton from '@/components/FormButton';
import LoginValidator from '@pod/common/source/schemaValidators/UserLoginValidator';
import transformValidationErrors from '@/utilities/transformValidationErrors';

import NotificationContext from 'context/NotificationContext';
import formErrorHandler from '@/utilities/formErrorHandler';

const Login: NextPage = () => {
  const router = useRouter();
  const setNotification = useContext(NotificationContext);
  const UserMutation = gql`
    mutation loginMutation($email: String!, $password: String!) {
      loginMutation(email: $email, password: $password) {
        username
        email
        token
      }
    }
  `;
  const [loginUser, { data, loading }] = useMutation(UserMutation);
  useEffect(() => {
    if (data !== undefined) {
      userDataVar(data.loginMutation);
      tokenVar(data.loginMutation.token);
      localStorage.setItem('userData', JSON.stringify(data.loginMutation));
      localStorage.setItem('token', JSON.stringify(data.loginMutation.token));
      router.push('/');
    }
  }, [data, router]);
  return (
    <>
      <HeadLayout
        title="Login"
        description="Login page for PodCaster"
        keywords="login, sign in"
      />

      <Formik
        validationSchema={LoginValidator}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values, { setErrors }: FormikHelpers<FormikValues>) => {
          console.log(values);
          loginUser({ variables: values })
            .then(() => setNotification({ content: 'You are now logged in!' }))
            .catch(err => {
              formErrorHandler(err, setErrors, setNotification);
            });
        }}
      >
        <FormWrapper>
          <Form>
            <FieldsWrapper>
              <Input name="email" type="email" placeholder="Email address" />

              <Input name="password" type="password" placeholder="Password" />

              <FormButton text={'Login'} loading={loading} />
            </FieldsWrapper>
          </Form>
        </FormWrapper>
      </Formik>
    </>
  );
};

export default Login;
