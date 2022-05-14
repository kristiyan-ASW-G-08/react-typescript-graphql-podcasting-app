import * as yup from 'yup';

const PodcastValidatorValidator = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(5)
    .max(50)
    .required(),
  website: yup
    .string()
    .trim()
    .url()
    .required(),
  cover: yup.mixed().required('Cover is required!'),
});

export default PodcastValidatorValidator;
