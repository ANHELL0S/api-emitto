import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '@/database/models/user.model'
import { MailModule } from '@/modules/mail/mail.module'
import { UserRepository } from '@/modules/users/user.repository'
import { AuthController } from '@/modules/auth/auth.controller'
import { SigninCommandService } from '@/modules/auth/signin.service'
import { SigninHandler } from '@/modules/auth/commands/handlers/singin.handler'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from '@/modules/auth/strategies/local.strategiy'
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy'

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    CqrsModule,
    MailModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_TIME') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    SigninHandler,
    UserRepository,
    SigninCommandService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [SigninCommandService],
})
export class AuthModule {}
