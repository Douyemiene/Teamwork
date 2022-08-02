
import { injectable } from 'inversify';
import crypto from 'crypto'
import { UserRepository } from '../../repositories/user';
import { IUser } from '../../infrastructure/mongo/models/user';
import Jwt from '../../util/jwt';

@injectable()
export class Login {
    constructor(private userRepository: UserRepository, private jwt: Jwt) { }

    async execute(user: Partial<IUser>) {
        try {
            const { username, email, password } = user
            
            let userFound = await this.userRepository.getOne(username);
            if (!userFound) 
              throw Error('user does not exist')

            const md5sum = crypto.createHash('md5');
            const hash = md5sum.update(password).digest('hex');

            console.log(`${userFound.password} ${hash}`)

            if (userFound.password !== hash)
              throw Error('incorrect password')
         
            const userObject = userFound.createObject()
            const token = await this.jwt.createToken(userObject)
            return { ...userObject, token }
        } catch (err) {
            throw err
        }
    }
}