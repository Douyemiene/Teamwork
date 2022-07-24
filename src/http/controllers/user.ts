import * as express from 'express';
import {
  interfaces,
  controller,
  httpGet,
  BaseHttpController,
} from 'inversify-express-utils';
import { SignUp } from '../../application/auth/signUp';

@controller('/user')
export class UserController extends BaseHttpController {
  constructor(private signUp: SignUp) {
    super();
  }

  @httpGet('/')
  private async index() {
    try {
      const { username, email } = this.httpContext.request.body;
      const result = await this.signUp.execute({ username, email });

      return this.ok({
        status: 'success',
        data: { message: 'new user created', ...result },
      });
    } catch (err) {
      const response = { status: 'error', error: null };
      return this.badRequest(JSON.stringify(response));
    }
  }
}