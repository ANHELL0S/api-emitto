import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { SecretKey } from '@/database/models/secret-key.model'
import { SecretKeyService } from '@/modules/secret-key/secret-key.service'
import { SecretKeyRepository } from '@/modules/secret-key/secret-key.repository'
import { SecretKeyController } from '@/modules/secret-key/secret-key.controller'
import { CreateUserHandler } from '@/modules/secret-key/commands/handlers/create-secretKey.handler'
import { DeleteSecretKeyHandler } from '@/modules/secret-key/commands/handlers/delete-secretKey.handler'
import { UpdateSecretKeyHandler } from '@/modules/secret-key/commands/handlers/update-SecreKey.handler'
import { GetAllSecretKeyHandler } from '@/modules/secret-key/queries/handlers/get-all-secretKeys.handler'
import { GetSecretKeyByIdHandler } from '@/modules/secret-key/queries/handlers/get-secretKey-by-id.handler'

@Module({
  imports: [
    SequelizeModule.forFeature([SecretKey]),
    CqrsModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_TIME') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    SecretKeyService,
    GetAllSecretKeyHandler,
    GetSecretKeyByIdHandler,
    DeleteSecretKeyHandler,
    UpdateSecretKeyHandler,
    SecretKeyRepository,
    CreateUserHandler,
  ],
  controllers: [SecretKeyController],
  exports: [SecretKeyService],
})
export class SecretKeyModule {}
