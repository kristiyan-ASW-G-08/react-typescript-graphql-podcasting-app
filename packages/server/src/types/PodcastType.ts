import { Document } from 'mongoose';

export default interface PodcastType extends Document {
  title: string;
  user: string;
  website: string;
  cover: string;
}
