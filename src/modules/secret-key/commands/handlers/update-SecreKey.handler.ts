import { Transaction } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { SecretKeyService } from '@/modules/secret-key/secret-key.service'
import { SecretKeyIdDto } from '@/modules/secret-key/dto/secretKey-id.dto'
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common'
import { SecretKeyRepository } from '@/modules/secret-key/secret-key.repository'
import { SecretKeyUpdateDto } from '@/modules/secret-key/dto/secretKey-update.dto'
import { SecretKeyResponseDto } from '@/modules/secret-key/dto/secretKey-response.dto'
import { UpdateSecretKeyCommand } from '@/modules/secret-key/commands/impl/update-secretKey.command'

@CommandHandler(UpdateSecretKeyCommand)
export class UpdateSecretKeyHandler
  implements ICommandHandler<UpdateSecretKeyCommand, SecretKeyResponseDto>
{
  constructor(
    @Inject(SecretKeyService)
    private readonly secretKeyService: SecretKeyService,

    @Inject(SecretKeyRepository)
    readonly secretKeyRepository: SecretKeyRepository,

    @Inject(Sequelize)
    readonly sequelize: Sequelize,
  ) {}

  async execute(command: UpdateSecretKeyCommand): Promise<any> {
    const { id, data } = command
    const transaction = await this.sequelize.transaction()
    try {
      const user = await this.updateSecretKeyWithTransaction(
        { id },
        data,
        transaction,
      )
      await transaction.commit()
      return user
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  private async updateSecretKeyWithTransaction(
    params: SecretKeyIdDto,
    data: SecretKeyUpdateDto,
    transaction: Transaction,
  ) {
    const existingSecretKey = await this.secretKeyService.findById(params.id)
    if (existingSecretKey === null)
      throw new NotFoundException('Usuario no encontrado')

    // Validar si el correo electrónico ya está tomado por otro usuario
    if (data.name) {
      const isEmailTaken =
        await this.secretKeyService.isFieldTakenByAnotherUser(
          'name',
          data.name,
          params.id,
        )

      if (isEmailTaken)
        throw new BadRequestException('Este nombre está registrado')
    }

    return await this.secretKeyRepository.update(params.id, data, transaction)
  }
}
