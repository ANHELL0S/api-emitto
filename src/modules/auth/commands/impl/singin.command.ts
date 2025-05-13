import { ICommand } from '@nestjs/cqrs'
import { SigninDto } from '@/modules/auth/dto/singin.dto'

export class SigninCommand implements ICommand {
  constructor(public readonly data: SigninDto) {}
}
