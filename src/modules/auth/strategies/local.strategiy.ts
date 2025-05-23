import { Strategy } from 'passport-local'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { SigninCommandService } from '@/modules/auth/signin.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: SigninCommandService) {
    super()
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ email, password })
    if (!user) throw new UnauthorizedException()
    return user
  }
}
