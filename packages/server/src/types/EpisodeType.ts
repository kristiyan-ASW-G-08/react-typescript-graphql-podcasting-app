import { Document } from 'mongoose';

export default interface PodcastType extends Document {
  title: string;
  description: string;
  audioFile: string;
  user: string;
  podcast: string;
}
