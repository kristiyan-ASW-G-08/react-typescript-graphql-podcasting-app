import { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeadLayout from '@/components/HeadLayout';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { gql, useMutation } from '@apollo/client';
import UserSignUpValidator from '@pod/common/source/schemaValidators/UserValidator';
import Input from '@/components/Input';
import FormWrapper from '@/components/FormWrapper';
import FieldsWrapper from '@/components/FieldsWrapper';
import FormButton from '@/components/FormButton';
import Navbar from '@/components/Navbar';
import transformValidationErrors from '@/utilities/transformValidationErrors';
import { UserMutation } from '@/queries/userQueries';
import NotificationContext from '@/context/NotificationContext';
import formErrorHandler from '@/utilities/formErrorHandler';

const SignUp: NextPage = () => {
  const router = useRouter();
  const setNotificationState = useContext(NotificationContext);
  const [createUser, { data, loading, error }] = useMutation(UserMutation);
  useEffect(() => {
    if (data !== undefined) {
      router.push('/login');
    }
  }, [data, router]);
  return (
    <>
      <HeadLayout
        title="Sign Up"
        description="Sign up page for PodCaster"
        keywords="sign up, register"
      />

      <Formik
        validationSchema={UserSignUpValidator}
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values, { setErrors }: FormikHelpers<FormikValues>) => {
          createUser({ variables: values })
            .then(() =>
              setNotificationState({
                content: 'You can now log in!',
                type: 'message',
              }),
            )
            .catch(err => {
              console.log(error, JSON.stringify(error));
              formErrorHandler(err, setErrors, setNotificationState);
            });
        }}
      >
        <FormWrapper>
          <Form>
            <FieldsWrapper>
              <Input name="username" type="text" placeholder="Username" />

              <Input name="email" type="email" placeholder="Email address" />

              <Input name="password" type="password" placeholder="Password" />

              <Input
                name="confirmPassword"
                type="password"
                placeholder="Repeat Password"
              />

              <FormButton text={'Sign Up'} loading={loading} />
            </FieldsWrapper>
          </Form>
        </FormWrapper>
      </Formik>
    </>
  );
};

export default SignUp;
