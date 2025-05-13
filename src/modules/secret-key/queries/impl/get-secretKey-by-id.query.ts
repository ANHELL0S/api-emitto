import { Query } from '@nestjs/cqrs'
import { SecretKeyResponseDto } from '@/modules/secret-key/dto/secretKey-response.dto'

export class GetSecretKeyByIdQuery extends Query<{
  data: SecretKeyResponseDto
}> {
  constructor(public readonly id: string) {
    super()
  }
}
