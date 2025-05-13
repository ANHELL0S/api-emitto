import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { SecretKeyRepository } from '@/modules/secret-key/secret-key.repository'
import { GetSecretKeyByIdQuery } from '@/modules/secret-key/queries/impl/get-secretKey-by-id.query'

@QueryHandler(GetSecretKeyByIdQuery)
export class GetSecretKeyByIdHandler
  implements IQueryHandler<GetSecretKeyByIdQuery>
{
  constructor(private readonly secretKeyRepository: SecretKeyRepository) {}

  async execute(params: GetSecretKeyByIdQuery): Promise<any> {
    return this.secretKeyRepository.findById(params.id)
  }
}
