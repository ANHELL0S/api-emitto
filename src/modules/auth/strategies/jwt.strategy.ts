import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'e2007c5221985f23a2d9b0dabbbf2d46',
    })
  }

  validate(payload: { userId: string }): {
    userId: string
  } {
    console.log('Inside JWT Strategy Validate')
    console.log(payload)
    return payload
  }
}
