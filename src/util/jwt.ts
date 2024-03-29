import { injectable } from 'inversify';
import jwt from 'jsonwebtoken'


@injectable()
class Jwt {
  private secret

  constructor() {
    this.secret = 'abc'
  }


  createToken(payload) {
    return jwt.sign(payload, this.secret, {
      expiresIn: 60 * 60 * 12,
    });
  }

  verifyToken(token) {
    try {
      const payload =  jwt.verify(token, this.secret) 
      return {payload}
    } catch (err) {
      throw Error
    }
  }


}

export default Jwt
