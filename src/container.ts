import { Container } from 'inversify'
import { MongoDBConnection } from './infrastructure/mongo/config';
import { Model } from 'mongoose';
import { User, IUser } from './infrastructure/mongo/models/user'


// create container
let container = new Container({ autoBindInjectable: true });

//set up bindings
container.bind<Function>('db').toConstantValue(MongoDBConnection);

//models
container.bind<Model<IUser>>('userModel').toConstantValue(User)
export default container