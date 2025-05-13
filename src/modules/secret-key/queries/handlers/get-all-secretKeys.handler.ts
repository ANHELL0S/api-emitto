import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { SecretKeyRepository } from '@/modules/secret-key/secret-key.repository'
import { GetAllSecretKeyQuery } from '@/modules/secret-key/queries/impl/get-all-secretKeys.query'

@QueryHandler(GetAllSecretKeyQuery)
export class GetAllSecretKeyHandler
  implements IQueryHandler<GetAllSecretKeyQuery>
{
  constructor(private readonly secreKeyRepository: SecretKeyRepository) {}

  async execute(query: GetAllSecretKeyQuery): Promise<any> {
    const { page, limit, search, startDate, endDate, orderBy, sortOrder } =
      query

    return this.secreKeyRepository.findAll(
      page,
      limit,
      search,
      startDate ? startDate.toISOString() : null,
      endDate ? endDate.toISOString() : null,
      orderBy,
      sortOrder,
    )
  }
}
