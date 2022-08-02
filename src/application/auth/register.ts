
import { injectable } from 'inversify';
import crypto from 'crypto'
import { UserRepository } from '../../repositories/user';
import { IUser } from '../../infrastructure/mongo/models/auth';
import Jwt from '../../util/jwt';

@injectable()
export class Register {
    constructor(private userRepository: UserRepository, private jwt: Jwt) { }

    async execute(user: Partial<IUser>) {
        try{
            const { username, email, password } = user
            let userFound = await this.userRepository.getOne(username);
            if(userFound){
                throw Error('duplicate: username or email')
            }
            
            const md5sum = crypto.createHash('md5');
            const hash = md5sum.update(password).digest('hex');
            const userData = await this.userRepository.create({...user})
            const token = await this.jwt.createToken(userData)   
            return {...userData, token}
        }catch(err){
           throw err
        }
    }
}