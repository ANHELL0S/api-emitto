import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '@/database/models/user.model'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SecretKey } from '@/database/models/secret-key.model'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'postgres',
          host: configService.get<string>(`DB_HOST`),
          port: configService.get<number>(`DB_PORT`),
          username: configService.get<string>(`DB_USER`),
          password: configService.get<string>(`DB_PASSWORD`),
          database: configService.get<string>(`DB_NAME`),
          models: [User, SecretKey], // Referencia directa a las clases de modelo
          autoLoadModels: true, // Opcional (usa uno de los dos enfoques)
          synchronize: false, // IMPORTANTE: mantener en false en producción
          logging: false,
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        }
      },
    }),
    // Registro adicional para inyección de dependencias
    SequelizeModule.forFeature([User, SecretKey]),
  ],
  exports: [
    SequelizeModule, // Exporta el módulo para usar en otros módulos
  ],
})
export class DatabaseModule {}
