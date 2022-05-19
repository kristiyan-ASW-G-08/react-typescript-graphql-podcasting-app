import CreatePodcastDto from './CreatePodcastDto';

export default interface EditPodcastDto extends CreatePodcastDto {
  _id: string;
}
