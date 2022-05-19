import * as yup from 'yup';
import imageFileTypes from '..//fileTypes/imageFileTypes';
const UpdatePodcastValidator = yup.object().shape({
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
  cover: yup.mixed().notRequired(),
});

export default UpdatePodcastValidator;
