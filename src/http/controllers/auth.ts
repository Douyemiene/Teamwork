import * as express from 'express';
import {
  controller,
  BaseHttpController,
  httpPost,
} from 'inversify-express-utils';
import { Login } from '../../application/auth/login';
import { Register } from '../../application/auth/register';

@controller('/auth')
export class AuthController extends BaseHttpController {
  constructor(private register: Register, private login: Login) {
    super();
  }


  @httpPost('/register')
  private async _register() {
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

  @httpPost('/login')
  private async _login() {
    try {
      const { username, email, password } = this.httpContext.request.body;

      const res = await this.login.execute({ username, email, password });

      return this.ok({
        status: 'success',
        data: { message: 'login successful', ...res },
      });
    } catch (err) {
      const response = { status: 'error', error: err.message };
      return this.badRequest(JSON.stringify(response));
    }
  }
}
