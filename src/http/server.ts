
import 'dotenv/config'
import 'reflect-metadata'
import * as bodyParser from 'body-parser';
import { Container } from 'inversify'
import * as swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import '../http/controllers'

export class RestServer {
    private server

    constructor(container) {
        // set up container
        container = new Container({ autoBindInjectable: true });

        this.server = new InversifyExpressServer(container);

        this.server.setConfig((app) => {
            app.use(bodyParser.urlencoded({
                extended: true
            }));

            const options = {
                definition: {
                    openapi: "3.0.0",
                    info: {
                        title: "instagram clone API",
                        version: "1.0.0",
                        description: "A minimal instagram clone",
                    },
                    servers: [
                        {
                            url: "http://localhost:30001",
                        },
                    ],
                },
                apis: [`./src/http/controllers/*.ts`],
            };

            const specs = swaggerJsDoc(options);

            app.use(bodyParser.json());

            app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
        });
    }

    start() {

        const app = this.server.build()

        const { PORT } = process.env
        app.listen(PORT, () => {
            console.log(`running on http://localhost:${PORT}`)
        })
    }
}













