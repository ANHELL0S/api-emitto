import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '@/database/models/user.model'
import { MailModule } from '@/modules/mail/mail.module'
import { UserService } from '@/modules/users/users.service'
import { UserRepository } from '@/modules/users/user.repository'
import { UsersController } from '@/modules/users/users.controller'
import { CreateUserHandler } from '@/modules/users/commands/handlers/create-user.handler'
import { UpdateUserHandler } from '@/modules/users/commands/handlers/update-user.handler'
import { DeleteUserHandler } from '@/modules/users/commands/handlers/delete-user.handler'
import { GetAllUsersHandler } from '@/modules/users/queries/handlers/get-all-users.handler'
import { GetUserByIdHandler } from '@/modules/users/queries/handlers/get-user-by-id.handler'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    CqrsModule,
    MailModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_TIME') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    UserRepository,
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    GetAllUsersHandler,
    GetUserByIdHandler,
    UserService,
  ],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
