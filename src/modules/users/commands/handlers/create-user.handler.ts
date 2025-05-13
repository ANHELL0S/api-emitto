import { BadRequestException, Inject } from '@nestjs/common'
import { Transaction } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { EmailService } from '@/modules/mail/mail.service'
import { UserService } from '@/modules/users/users.service'
import { UserCreateDto } from '@/modules/users/dto/user-create.dto'
import { UserRepository } from '@/modules/users/user.repository'
import { CreateUserCommand } from '@/modules/users/commands/impl/create-user.command'
import { SendEmailDto } from '@/modules/mail/dto/send-email.dto'
import { FACTORY_INFO } from '@/shared/constants/factory-info'
import { generateWelcomeMessage } from '@/modules/mail/templates/welcome-user'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserService)
    private readonly usersService: UserService,

    @Inject(EmailService)
    private readonly emailService: EmailService,

    @Inject(UserRepository)
    private readonly usersRepository: UserRepository,

    @Inject(Sequelize)
    private readonly sequelize: Sequelize,
  ) {}

  async execute(command: CreateUserCommand) {
    const { data } = command
    const transaction = await this.sequelize.transaction()
    try {
      const user = await this.createUserWithTransaction(data, transaction)
      await this.sendWelcomeEmail({ email: user.email, name: user.name })
      await transaction.commit()
      return {
        data: user,
      }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  private async createUserWithTransaction(
    data: UserCreateDto,
    transaction: Transaction,
  ) {
    const existingUser = await this.usersService.findByField(
      'email',
      data.email,
    )
    if (existingUser) throw new BadRequestException('El correo ya está en uso')

    const hashedPassword = await this.usersService.encryptPassword(
      data.password,
    )

    const userToCreate = {
      ...data,
      password: hashedPassword,
    }
    return await this.usersRepository.create(userToCreate, transaction)
  }

  private async sendWelcomeEmail(user: { email: string; name: string }) {
    const emailData: SendEmailDto = {
      from: `${FACTORY_INFO.EMAIL}`,
      subjectEmail: `¡Bienvenido a ${FACTORY_INFO.NAME}!`,
      sendTo: [user.email],
      message: generateWelcomeMessage(user.name),
    }
    await this.emailService.sendEmail(emailData)
  }
}
