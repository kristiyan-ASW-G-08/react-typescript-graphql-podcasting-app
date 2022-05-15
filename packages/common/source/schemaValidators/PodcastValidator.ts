import * as yup from 'yup';
import imageFileTypes from '..//fileTypes/imageFileTypes';
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
  cover: yup
    .mixed()
    .required('Cover is required!')
    .test('fileType', 'Upload an Image file', value => {
      if (value.type) {
        return imageFileTypes.includes(value.type);
      } else if (value.file) {
        return imageFileTypes.includes(value.file.mimetype);
      }
      return imageFileTypes.includes(value.type);
    }),
});

export default PodcastValidatorValidator;
