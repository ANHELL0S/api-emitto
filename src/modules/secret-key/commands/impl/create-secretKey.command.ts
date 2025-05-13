import { ICommand } from '@nestjs/cqrs'
import { SecretKeyCreateDto } from '@/modules/secret-key/dto/secretKey-create.dto'

export class CreateSecretKeyCommand implements ICommand {
  constructor(public readonly data: SecretKeyCreateDto) {}
}
