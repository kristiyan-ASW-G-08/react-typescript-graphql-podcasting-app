import mongoose, { Model, Document } from 'mongoose';
import Pagination from '@customTypes/Pagination';

const getResources = async <
  T extends Document,
  Y = { [key: string]: string | mongoose.Types.ObjectId }
>({
  query,
  model,
  pagination: { limit, page },
}: {
  query: Y;
  model: Model<T>;
  pagination: Pagination;
}): Promise<{ count: number; documents: T[] }> => {
  const documents = await model
    .countDocuments()
    .find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  const count = (await model.countDocuments(query)) - page * limit;

  return { count, documents };
};

export default getResources;
