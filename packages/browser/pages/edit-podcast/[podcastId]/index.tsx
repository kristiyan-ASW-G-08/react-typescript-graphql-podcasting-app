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
import UpdatePodcastValidator from '@pod/common/source/schemaValidators/UpdatePodcastValidator';
import NotificationContext from 'context/NotificationContext';
import formErrorHandler from '@/utilities/formErrorHandler';
import UploadButton from '@/components/UploadButton';
import { updatePodcastMutation } from '@/queries/podcastMutations';
import Podcast from '@/types/Podcast';
import apolloClient from 'apolloClient';
import getPodcastQuery from '@/queries/getPodcastQuery';
import getPodcastsQuery from '@/queries/getPodcasts';

const EditPodcastPage: NextPage<{ podcast: Podcast }> = ({
  podcast: { title, website },
}) => {
  const setNotificationState = useContext(NotificationContext);
  const router = useRouter();
  console.log();
  const [updatePodcast, { data, loading }] = useMutation(
    updatePodcastMutation,
    {
      refetchQueries: [getPodcastQuery, 'getPodcast'],
    },
  );
  useEffect(() => {
    if (data !== undefined) {
      router.push(`/podcast/${data.updatePodcastMutation._id}`);
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
        validationSchema={UpdatePodcastValidator}
        initialValues={{
          title,
          website,
          cover: '',
        }}
        onSubmit={(values, { setErrors }: FormikHelpers<FormikValues>) => {
          updatePodcast({
            variables: { ...values, _id: router.query.podcastId },
          })
            .then(() =>
              setNotificationState({
                content: 'You have edited you podcast!',
                type: 'message',
              }),
            )
            .catch(err => {
              console.log(JSON.stringify(err));
              formErrorHandler(err, setErrors, setNotificationState);
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
                <FormButton text={'Edit Podcast'} loading={loading} />
              </FieldsWrapper>
            </Form>
          </FormWrapper>
        )}
      </Formik>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { podcastId } = context.query;
  const {
    data: { getPodcast },
  } = await apolloClient.query({
    query: getPodcastQuery,
    variables: { podcastId },
  });

  return {
    props: {
      podcast: getPodcast,
    },
  };
}

export default EditPodcastPage;
