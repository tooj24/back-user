import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser {
  lastname: string;
  firstname: string;
  email: string;
}

interface UserModel extends Model<any> {
  build(attr: IUser): UserDoc
}

interface UserDoc extends Document {
  lastname: string;
  firstname: string;
  email: string;
}

const userSchema: Schema = new Schema({
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
})

userSchema.set('timestamps', true);

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }