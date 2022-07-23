import * as mongoose from "mongoose";
import { Model } from "mongoose";

export interface IUser {
    id: string;
    username: string;
    email: string,
    password: string,
    fullname: string,
    bio: string,
    following: number,
    followers: string[]
}


// Put all user instance methods in this interface:
interface IUserMethods {
  createObject(): IUser;
}

// Create a new Model type that knows about IUserMethods...
export type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
    id: String,
    username: {
        type: String,
        required: true,
        // unique: true
    },
    email: {
        type: String,
        // required: true,
        // unique: true
    },
    password: String,
    fullname: String,
    bio: String,
    following: Number,
    followers: [String]
    },
    { timestamps: true });

UserSchema.method('createObject', function () {
  const user = this.toObject();
  delete user['__v'];
  delete user['_id'];
  return user;
})

export const User = mongoose.model<IUser,UserModel>("User", UserSchema);
export default User;
