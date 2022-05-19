import mongoose, { Schema } from 'mongoose';
import EpisodeType from '@customTypes/EpisodeType';
import uniqueValidator from 'mongoose-unique-validator';
import duplicationErrorHandler from '@customUtilities/duplicationErrorHandler';

const EpisodeSchema = new Schema<EpisodeType>({
  title: { type: String, maxlength: 50, minlength: 1 },
  description: { type: String, required: true },
  audioFile: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  podcast: {
    type: Schema.Types.ObjectId,
    ref: 'Podcast',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// // @ts-ignore
// EpisodeSchema.plugin(uniqueValidator);
// // @ts-ignore
// EpisodeSchema.post('save', duplicationErrorHandler);
// // @ts-ignore
// EpisodeSchema.post('update', duplicationErrorHandler);

export default mongoose.model<EpisodeType>('Episode', EpisodeSchema);
