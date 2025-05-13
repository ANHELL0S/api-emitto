import { ICommand } from '@nestjs/cqrs'
import { UserCreateDto } from '@/modules/users/dto/user-create.dto'

export class CreateUserCommand implements ICommand {
  constructor(public readonly data: UserCreateDto) {}
}
