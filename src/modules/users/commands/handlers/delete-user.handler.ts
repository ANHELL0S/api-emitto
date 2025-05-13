import { Transaction } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { UserIdDto } from '@/modules/users/dto/user-id.dto'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserRepository } from '@/modules/users/user.repository'
import { DeleteUserCommand } from '@/modules/users/commands/impl/delete-user.command'

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sequelize: Sequelize,
  ) {}

  async execute(command: DeleteUserCommand) {
    const { id } = command
    const transaction = await this.sequelize.transaction()
    try {
      const user = await this.deleteUserWithTransaction({ id }, transaction)

      await transaction.commit()

      return user
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  private async deleteUserWithTransaction(
    params: UserIdDto,
    transaction: Transaction,
  ) {
    return await this.userRepository.delete(params.id, transaction)
  }
}
