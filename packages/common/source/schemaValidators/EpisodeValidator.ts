import audioFileTypes from '../fileTypes/audioFileTypes';
import * as yup from 'yup';

const EpisodeValidator = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(5)
    .max(50)
    .required(),
  description: yup
    .string()
    .trim()
    .min(50)
    .max(3000)
    .required(),
  audioFile: yup
    .mixed()
    .required('Audio File is required!')
    .test(
      'fileType',
      'Upload an Audio. Current file type is not supported',
      value => {
        if (value && value.type) {
          return audioFileTypes.includes(value.type);
        } else if (value && value.file) {
          return audioFileTypes.includes(value.file.mimetype);
        } else if (value && value.then) {
          //@ts-ignore
          value.then(({ file }) => {
            return audioFileTypes.includes(file.mimetype);
          });
        }
        return false;
      },
    ),
});

export default EpisodeValidator;
