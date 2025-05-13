import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { SigninCommandService } from '@/modules/auth/signin.service'
import { SigninCommand } from '@/modules/auth/commands/impl/singin.command'

@CommandHandler(SigninCommand)
export class SigninHandler implements ICommandHandler<SigninCommand> {
  constructor(
    @Inject(SigninCommandService)
    private readonly signinService: SigninCommandService,
  ) {}

  async execute(command: SigninCommand) {
    const { data } = command
    const session = await this.signinService.signin(data)
    return {
      data: session,
    }
  }
}
