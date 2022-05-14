import { UserInputError } from 'apollo-server';
import mongoose, { Model, Document } from 'mongoose';

interface FindQuery {
  name: string;
  value: number | string | mongoose.Types.ObjectId;
}
const getResource = async <T extends Document>(
  model: Model<T>,
  { value, name }: FindQuery,
  Error: any,
  select: string = '',
): Promise<T> => {
  const resource = await model.findOne({ [name]: value }).select(select);
  if (!resource) {
    throw Error;
  }
  return resource;
};

export default getResource;
