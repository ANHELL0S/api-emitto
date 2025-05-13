import { Transaction } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { BadRequestException, Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { SecretKeyService } from '@/modules/secret-key/secret-key.service'
import { SecretKeyRepository } from '@/modules/secret-key/secret-key.repository'
import { SecretKeyCreateDto } from '@/modules/secret-key/dto/secretKey-create.dto'
import { CreateSecretKeyCommand } from '@/modules/secret-key/commands/impl/create-secretKey.command'

@CommandHandler(CreateSecretKeyCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateSecretKeyCommand>
{
  constructor(
    @Inject(SecretKeyService)
    private readonly secretKeyService: SecretKeyService,

    @Inject(SecretKeyRepository)
    private readonly secretKeyRepository: SecretKeyRepository,

    @Inject(Sequelize)
    private readonly sequelize: Sequelize,
  ) {}

  async execute(command: CreateSecretKeyCommand) {
    const { data } = command
    const transaction = await this.sequelize.transaction()
    try {
      const user = await this.createSecretKeyWithTransaction(data, transaction)
      await transaction.commit()
      return {
        data: user,
      }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  private async createSecretKeyWithTransaction(
    data: SecretKeyCreateDto,
    transaction: Transaction,
  ) {
    const existingSecretKey = await this.secretKeyService.findByField(
      'name',
      data.name,
    )

    if (existingSecretKey)
      throw new BadRequestException('El nombre de la clave ya está en uso')
    const newSecretKey = this.secretKeyService.generateSecretKey()

    const secretKeyToCreate = {
      ...data,
      secret_key: newSecretKey,
    }
    return await this.secretKeyRepository.create(secretKeyToCreate, transaction)
  }
}
