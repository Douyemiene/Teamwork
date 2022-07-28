import * as express from 'express';
import {
  interfaces,
  controller,
  httpGet,
  BaseHttpController,
} from 'inversify-express-utils';
import { Register } from '../../application/auth/register';

@controller('/auth')
export class AuthController extends BaseHttpController {
  constructor(private register: Register) {
    super();
  }

  /**
 * @swagger
 * /booka:
 *   get:
 *     description: register a new user
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
  @httpGet('/register')
  private async index() {
    try {
      const { username, email } = this.httpContext.request.body;
      const result = await this.register.execute({ username, email });

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
