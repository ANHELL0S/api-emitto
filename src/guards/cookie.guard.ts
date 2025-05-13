import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class CookieAuthGuard {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = this.getRequest(context)
    const token = this.extractTokenFromCookies(request)

    if (!token)
      throw new UnauthorizedException('Token no encontrado en cookies')

    try {
      const payload = this.jwtService.verify(token)
      request.user = payload // Inyectamos el usuario en el request
      return true
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado')
    }
  }

  private extractTokenFromCookies(request: Request): string | null {
    return request.cookies?.accessToken || null
  }

  private getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest()
  }
}
