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
    .max(500)
    .required(),
  audioFile: yup
    .mixed()
    .required('Audio File is required!')
    .test('fileType', 'Upload an Audio', value => {
      if (value.type) {
        return audioFileTypes.includes(value.type);
      } else if (value.file) {
        return audioFileTypes.includes(value.file.mimetype);
      }
      return audioFileTypes.includes(value.type);
    }),
});

export default EpisodeValidator;
