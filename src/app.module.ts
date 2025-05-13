import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { BullModule } from '@nestjs/bull'
import { CqrsModule } from '@nestjs/cqrs'
import { ThrottlerModule } from '@nestjs/throttler'
import { DatabaseModule } from '@/database/db.module'
import { MailModule } from '@/modules/mail/mail.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { UsersModule } from '@/modules/users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CustomThrottlerGuard } from './guards/custom-throttler.guard'
import { SecretKeyModule } from '@/modules/secret-key/secret-key.module'

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        { name: 'strict', ttl: 60000, limit: 5 },
        { name: 'public', ttl: 1000, limit: 10 },
        { name: 'default', ttl: 10000, limit: 50 },
      ],
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
          password: configService.get<string>('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_TIME') },
      }),
      inject: [ConfigService],
    }),
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: (() => {
        const env = process.env.NODE_ENV
        if (env === 'production') return '.env.production'
        if (env === 'test') return '.env.test'
        return '.env.development'
      })(),
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    MailModule,
    UsersModule,
    SecretKeyModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
