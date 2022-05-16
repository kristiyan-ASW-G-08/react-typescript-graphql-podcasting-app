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
    .test('fileType', 'Upload an Image. Current file type is not supported', value => {
      if (value && value.type) {
        return imageFileTypes.includes(value.type);
      } else if (value && value.file) {
        return imageFileTypes.includes(value.file.mimetype);
      } else if (value && value.then) {
        //@ts-ignore
        value.then(({ file }) => {
          return imageFileTypes.includes(file.mimetype);
        });
      }
      return false;
    }),
});

export default PodcastValidatorValidator;
