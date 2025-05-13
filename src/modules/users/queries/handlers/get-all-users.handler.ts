import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { UserRepository } from '@/modules/users/user.repository'
import { GetAllUsersQuery } from '@/modules/users/queries/impl/get-all-users.query'

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetAllUsersQuery): Promise<any> {
    const { page, limit, search, startDate, endDate, orderBy, sortOrder } =
      query

    return this.userRepository.findAll(
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
