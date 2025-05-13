import { Transaction } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { SecretKeyIdDto } from '@/modules/secret-key/dto/secretKey-id.dto'
import { SecretKeyRepository } from '@/modules/secret-key/secret-key.repository'
import { DeleteSecretKeyCommand } from '@/modules/secret-key/commands/impl/delete-secretKey.command'

@CommandHandler(DeleteSecretKeyCommand)
export class DeleteSecretKeyHandler
  implements ICommandHandler<DeleteSecretKeyCommand>
{
  constructor(
    private readonly secretKeyRepository: SecretKeyRepository,
    private readonly sequelize: Sequelize,
  ) {}

  async execute(command: DeleteSecretKeyCommand) {
    const { id } = command
    const transaction = await this.sequelize.transaction()
    try {
      const secretKey = await this.deleteSecretkeyWithTransaction(
        { id },
        transaction,
      )

      await transaction.commit()

      return secretKey
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  private async deleteSecretkeyWithTransaction(
    params: SecretKeyIdDto,
    transaction: Transaction,
  ) {
    return await this.secretKeyRepository.delete(params.id, transaction)
  }
}
