
import { inject, injectable } from 'inversify';
import { IUser, User, UserModel } from '../infrastructure/mongo/models/user';
import { HydratedDocument, Model } from 'mongoose';

export interface IUserRepo {
    create(user: Partial<IUser>): Promise<IUser>;
    getOne(username: string): Promise<IUser | null>;
    //getAll(): Array<IUser>
    //putUser(): void
    //getUsers(params: Partial<IUser>): Promise<IUser[] | null>
}

@injectable()
export class UserRepository implements IUserRepo {
    private userModel: UserModel = User;
    constructor(){

    }

    async create(user: Partial<IUser>): Promise<IUser> {
        const userData = await this.userModel.create({ ...user })
        const data = userData.createObject()
        return data
    }
    
    async getOne(username: string): Promise<IUser>{
        return await this.userModel.findOne({username})
    }
}