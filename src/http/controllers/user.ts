import * as express from "express";
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam, next } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { UserRepository } from "../../repositories/user";
import { SignUp } from "../../application/auth/signUp";

@controller("/user")
export class UserController implements interfaces.Controller {

    constructor(private userRepository: UserRepository, private signUp: SignUp,  ) { }

    @httpGet("/")
    private index(@request() req: express.Request, @response() res: express.Response, @next() next: express.NextFunction) {
        //const result = this.userRepository.create({username: 'da', email:'a@ab.com'})
        const result = this.signUp.execute({username: 'test5',email:'test@test5.com'})
        return result
    }

 
}
