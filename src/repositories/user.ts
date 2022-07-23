
import { inject, injectable } from 'inversify';
import { IUser, User } from '../infrastructure/mongo/models/user';
import { Model } from 'mongoose';

export interface IUserRepo {
    create(user: Partial<IUser>): Promise<IUser>;
    getOne(username: string): Promise<IUser | null>;
    //getAll(): Array<IUser>
    //putUser(): void
    //getUsers(params: Partial<IUser>): Promise<IUser[] | null>
}

@injectable()
export class UserRepository implements IUserRepo {
    private userModel: Model<IUser> = User;
    constructor(){

    }

    async create(user: Partial<IUser>): Promise<IUser> {
        return await this.userModel.create({ ...user })
        // return 'one of the foos'
    }
    
    async getOne(username: string): Promise<IUser>{
        return await this.userModel.findOne({username})
    }
}