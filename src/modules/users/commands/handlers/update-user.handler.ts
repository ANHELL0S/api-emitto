import { Transaction } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { UserService } from '@/modules/users/users.service'
import { UserIdDto } from '@/modules/users/dto/user-id.dto'
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserUpdateDto } from '@/modules/users/dto/user-update.dto'
import { UserRepository } from '@/modules/users/user.repository'
import { UpdateUserCommand } from '@/modules/users/commands/impl/update-user.command'
import { UserResponseDto } from '../../dto/user-response.dto'

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements ICommandHandler<UpdateUserCommand, UserResponseDto>
{
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(UserRepository)
    readonly userRepository: UserRepository,

    @Inject(Sequelize)
    readonly sequelize: Sequelize,
  ) {}

  async execute(command: UpdateUserCommand): Promise<any> {
    const { id, data } = command
    const transaction = await this.sequelize.transaction()
    try {
      const user = await this.updateUserWithTransaction(
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

  private async updateUserWithTransaction(
    params: UserIdDto,
    data: UserUpdateDto,
    transaction: Transaction,
  ) {
    // Validar si el usuario existe
    const existingUser = await this.userService.findById(params.id)
    if (existingUser === null)
      throw new NotFoundException('Usuario no encontrado')

    // Validar si el correo electrónico ya está tomado por otro usuario
    if (data.email) {
      const isEmailTaken = await this.userService.isFieldTakenByAnotherUser(
        'email',
        data.email,
        params.id,
      )

      if (isEmailTaken)
        throw new BadRequestException(
          'Este correo electrónico ya está registrado',
        )
    }

    // Actualizar el usuario en la base de datos
    return await this.userRepository.update(params.id, data, transaction)
  }
}
