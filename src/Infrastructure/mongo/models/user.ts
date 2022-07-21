import * as mongoose from "mongoose";


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


const UserSchema = new mongoose.Schema<IUser>({
    id: String,
    username: String,
    email: String,
    password: String,
    fullname: String,
    bio: String,
    following: Number,
    followers: [String]
},
    { timestamps: true });

export const User = mongoose.model<IUser>("User", UserSchema);
export default User;