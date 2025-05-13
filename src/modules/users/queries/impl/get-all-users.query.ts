import { Query } from '@nestjs/cqrs'
import { UserResponseDto } from '@/modules/users/dto/user-response.dto'

export class GetAllUsersQuery extends Query<{ data: UserResponseDto[] }> {
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
