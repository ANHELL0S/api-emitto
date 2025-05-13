import { Query } from '@nestjs/cqrs'
import { SecretKeyResponseDto } from '@/modules/secret-key/dto/secretKey-response.dto'

export class GetAllSecretKeyQuery extends Query<{
  data: SecretKeyResponseDto[]
}> {
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly search: string,
    public readonly startDate: Date | null,
    public readonly endDate: Date | null,
    public readonly orderBy: string,
    public readonly sortOrder: 'ASC' | 'DESC',
  ) {
    super()
  }
}
