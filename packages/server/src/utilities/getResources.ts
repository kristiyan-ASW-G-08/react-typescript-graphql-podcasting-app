import mongoose, { Model, Document } from 'mongoose';
import Pagination from '@customTypes/Pagination';

const getResources = async <
  T extends Document,
  Y = { [key: string]: string | mongoose.Types.ObjectId }
>({
  query,
  model,
}: {
  query: Y;
  model: Model<T>;
}): Promise<T[]> => {
  return model.countDocuments().find(query);
};

export default getResources;
