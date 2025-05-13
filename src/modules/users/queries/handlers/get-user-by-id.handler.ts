import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { UserRepository } from '@/modules/users/user.repository'
import { GetUserByIdQuery } from '@/modules/users/queries/impl/get-user-by-id.query'

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: GetUserByIdQuery): Promise<any> {
    return this.userRepository.findById(params.id)
  }
}
