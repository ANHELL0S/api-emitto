import { ICommand } from '@nestjs/cqrs'
import { UserUpdateDto } from '@/modules/users/dto/user-update.dto'

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly data: UserUpdateDto,
  ) {}
}
