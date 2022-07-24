
import { injectable } from 'inversify';
import { UserRepository } from '../../repositories/user';
import { IUser } from '../../infrastructure/mongo/models/user';

@injectable()
export class SignUp {
    constructor(private userRepository: UserRepository, private jwt: Jwt) { }

    async execute(user: Partial<IUser>) {
        try{
            const { username } = user
            let userFound = await this.userRepository.getOne(username);
            if(userFound){
                throw Error('duplicate: username or email')
            }

            const userData = await this.userRepository.create({...user})
            const token = await this.jwt.createToken(userData)   
            return {...userData, token}
        }catch(err){
           throw err
        }
    }
}