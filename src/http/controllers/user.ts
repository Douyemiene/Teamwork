import * as express from "express";
import { interfaces, controller, httpGet, httpPost, request, response, next, HttpResponseMessage, StringContent, BaseHttpController } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { UserRepository } from "../../repositories/user";
import { SignUp } from "../../application/auth/signUp";

@controller("/user")
export class UserController extends BaseHttpController  {

    constructor( private signUp: SignUp ) { 
        super()
    }

    @httpGet("/")
    private async index(@request() req: express.Request, @response() res: express.Response, @next() next: express.NextFunction) {
        const {username,email} = this.httpContext.request.body;
        const result = await this.signUp.execute({username,email})
         const response = new HttpResponseMessage(200);

        return this.ok(result)
    }

 
}
