import { ICommand } from '@nestjs/cqrs'
import { SecretKeyUpdateDto } from '@/modules/secret-key/dto/secretKey-update.dto'

export class UpdateSecretKeyCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly data: SecretKeyUpdateDto,
  ) {}
}
