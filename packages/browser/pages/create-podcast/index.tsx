import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import HeadLayout from '@/components/HeadLayout';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { tokenVar } from '../../variables';
import Input from '@/components/Input';
import FormWrapper from '@/components/FormWrapper';
import FieldsWrapper from '@/components/FieldsWrapper';
import FormButton from '@/components/FormButton';
import PodcastValidator from '@pod/common/source/schemaValidators/PodcastValidator';
import NotificationContext from 'context/NotificationContext';
import formErrorHandler from '@/utilities/formErrorHandler';
import UploadButton from '@/components/ImageInput';

const Login: NextPage = () => {
  const setNotification = useContext(NotificationContext);
  const router = useRouter();
  const createPodcastMutation = gql`
    mutation createPodcastMutation(
      $title: String!
      $website: String!
      $cover: Upload
    ) {
      createPodcastMutation(title: $title, website: $website, cover: $cover) {
        id
      }
    }
  `;
  const [createPodcast, { data, loading }] = useMutation(createPodcastMutation);
  useEffect(() => {
    if (data !== undefined) {
      console.log(data);
      router.push('/');
    }
  }, [data, router]);
  return (
    <>
      <HeadLayout
        title="Create New Podcast"
        description="Create new podcasts page for PodCaster"
        keywords="podcast"
      />

      <Formik
        validationSchema={PodcastValidator}
        initialValues={{
          title: '',
          website: '',
          cover: '',
        }}
        onSubmit={(values, { setErrors }: FormikHelpers<FormikValues>) => {
          createPodcast({ variables: values })
            .then(() =>
              setNotification({
                content: 'You have successfully created a podcast!',
              }),
            )
            .catch(err => {
              console.log(JSON.stringify(err));
              formErrorHandler(err, setErrors, setNotification);
            });
        }}
      >
        {({ setFieldValue }) => (
          <FormWrapper>
            <Form>
              <FieldsWrapper>
                <Input name="title" type="text" placeholder="Title" />

                <Input name="website" type="url" placeholder="Website" />
                <UploadButton name="cover" setFieldValue={setFieldValue} />
                <FormButton text={'Create a Podcast'} loading={loading} />
              </FieldsWrapper>
            </Form>
          </FormWrapper>
        )}
      </Formik>
    </>
  );
};

export default Login;
