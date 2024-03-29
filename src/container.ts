import { Container } from 'inversify'
import { MongoDBConnection } from './infrastructure/mongo/config';


// create container
let container = new Container({ autoBindInjectable: true });

//set up bindings
container.bind<Function>('db').toConstantValue(MongoDBConnection);

export default container