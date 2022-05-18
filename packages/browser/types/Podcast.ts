export default interface Podcast {
  title: string;
  website: string;
  cover: string;
  user: {
    username: string;
    _id: string;
  };
  _id: string;
}
