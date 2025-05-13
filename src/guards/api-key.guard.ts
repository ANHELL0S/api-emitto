import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { SecretKeyService } from '@/modules/secret-key/secret-key.service'

@Injectable()
export class SecretKeyGuard implements CanActivate {
  constructor(private readonly secretKeyService: SecretKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const apiKey = Array.isArray(request.headers['x-key-emitto'])
      ? request.headers['x-key-emitto'][0]
      : request.headers['x-key-emitto']

    // Si no existe la clave en el header
    if (!apiKey)
      throw new UnauthorizedException('No se proporciono una secret key')

    // Verificamos si la clave existe en la base de datos
    const validKey = await this.secretKeyService.validateApiKey(apiKey)
    if (!validKey) throw new UnauthorizedException('Invalid API key')

    return true
  }
}
