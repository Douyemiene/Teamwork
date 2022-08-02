import * as express from 'express';
import crypto from 'crypto'
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

      const md5sum = crypto.createHash('md5');

      const { username, email, password } = this.httpContext.request.body;
      const hash = md5sum.update(password).digest('hex');
      const result = await this.register.execute({ username, email, password:hash });

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
