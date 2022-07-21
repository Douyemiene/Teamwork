import { RestServer } from './http/server'; 

export class Application{
    private container

    constructor(container){
        this.container = container
    }

    async start(){
        let db = this.container.get('db')
        const server = new RestServer(this.container)
        await db.connect()
        server.start()

    }
}