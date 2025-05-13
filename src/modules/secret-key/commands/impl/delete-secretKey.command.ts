import { ICommand } from '@nestjs/cqrs'

export class DeleteSecretKeyCommand implements ICommand {
  constructor(public readonly id: string) {}
}
