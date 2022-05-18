import mongoose, { Schema } from 'mongoose';
import PodcastType from '@customTypes/PodcastType';
import uniqueValidator from 'mongoose-unique-validator';
import duplicationErrorHandler from '@customUtilities/duplicationErrorHandler';

const PodcastSchema = new Schema<PodcastType>({
  title: { type: String, maxlength: 50, minlength: 1, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  website: { type: String, required: true },
  cover: { type: String, required: true },
});

// @ts-ignore
PodcastSchema.plugin(uniqueValidator);
// @ts-ignore
PodcastSchema.post('save', duplicationErrorHandler);
// @ts-ignore
PodcastSchema.post('update', duplicationErrorHandler);

PodcastSchema.index({ title: 'text' });

export default mongoose.model<PodcastType>('Podcast', PodcastSchema);
