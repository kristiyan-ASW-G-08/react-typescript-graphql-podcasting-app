import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import HeadLayout from '@/components/HeadLayout';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { useMutation } from '@apollo/client';
import Input from '@/components/Input';
import FormWrapper from '@/components/FormWrapper';
import FieldsWrapper from '@/components/FieldsWrapper';
import FormButton from '@/components/FormButton';
import EpisodeValidator from '@pod/common/source/schemaValidators/EpisodeValidator';
import NotificationContext from 'context/NotificationContext';
import formErrorHandler from '@/utilities/formErrorHandler';
import UploadButton from '@/components/UploacButton';
import { createEpisodeMutation } from '@/queries/episodeMutations';

const CreateEpisodePage: NextPage = () => {
  const setNotification = useContext(NotificationContext);
  const router = useRouter();
  const podcast = router.query.podcastId;
  const [createEpisode, { data, loading }] = useMutation(createEpisodeMutation);
  useEffect(() => {
    if (data !== undefined) {
      console.log(data);
      router.push(`/episode/${data.createEpisodeMutation._id}`);
    }
  }, [data, router]);
  return (
    <>
      <HeadLayout
        title="Create New Episode"
        description="Create new podcasts episode"
        keywords="episode"
      />

      <Formik
        validationSchema={EpisodeValidator}
        initialValues={{
          title: '',
          description: '',
          audioFile: '',
        }}
        onSubmit={(values, { setErrors }: FormikHelpers<FormikValues>) => {
          createEpisode({ variables: { ...values, podcast } })
            .then(() =>
              setNotification({
                content: 'You have successfully created an episode!',
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

                <Input
                  name="description"
                  type="text"
                  placeholder="description"
                />
                <UploadButton name="audioFile" setFieldValue={setFieldValue} />
                <FormButton text={'Create an Episode'} loading={loading} />
              </FieldsWrapper>
            </Form>
          </FormWrapper>
        )}
      </Formik>
    </>
  );
};

export default CreateEpisodePage;
