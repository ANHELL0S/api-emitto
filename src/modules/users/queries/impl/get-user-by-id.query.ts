import { Query } from '@nestjs/cqrs'
import { UserResponseDto } from '@/modules/users/dto/user-response.dto'

export class GetUserByIdQuery extends Query<{ data: UserResponseDto }> {
  constructor(public readonly id: string) {
    super()
  }
}
