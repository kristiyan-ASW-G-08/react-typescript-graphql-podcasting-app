import mongoose, { Schema } from 'mongoose';
import UserType from '@src/types/UserType';
import duplicationErrorHandler from '@customUtilities/duplicationErrorHandler';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema: Schema = new Schema({
  username: { type: String, minlength: 1, maxlength: 50, unique: true },
  email: { type: String, unique: true },
  password: { type: String, minlength: 8 },
});

UserSchema.plugin(uniqueValidator);
// @ts-ignore
UserSchema.post('save', duplicationErrorHandler);
// @ts-ignore
UserSchema.post('update', duplicationErrorHandler);

export default mongoose.model<UserType>('User', UserSchema);
