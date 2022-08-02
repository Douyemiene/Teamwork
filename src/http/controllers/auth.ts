import * as express from 'express';
import {
  controller,
  BaseHttpController,
  httpPost,
} from 'inversify-express-utils';
import { Register } from '../../application/auth/register';

@controller('/auth')
export class AuthController extends BaseHttpController {
  constructor(private register: Register) {
    super();
  }


  @httpPost('/register')
  private async index() {
    try {
      const { username, email, password } = this.httpContext.request.body;

      const result = await this.register.execute({ username, email, password });

      return this.ok({
        status: 'success',
        data: { message: 'new user created', ...result },
      });
    } catch (err) {
      const response = { status: 'error', error: err.message };
      return this.badRequest(JSON.stringify(response));
    }
  }
}
