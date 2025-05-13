import {
  ThrottlerGuard,
  ThrottlerOptions,
  ThrottlerException,
  ThrottlerModuleOptions,
  ThrottlerStorageService,
} from '@nestjs/throttler'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { THROTTLER_OPTIONS } from '@nestjs/throttler/dist/throttler.constants'

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  constructor(
    protected readonly options: ThrottlerModuleOptions,
    protected readonly storageService: ThrottlerStorageService,
    protected readonly reflector: Reflector,
  ) {
    super(options, storageService, reflector)
  }

  protected throwThrottlingException(context: ExecutionContext): Promise<void> {
    const throttlerOptions = this.reflector.getAllAndOverride<
      ThrottlerOptions[]
    >(THROTTLER_OPTIONS, [context.getHandler(), context.getClass()])

    type LimitType = 'strict' | 'public' | 'default'
    const limitName: LimitType =
      (throttlerOptions?.[0]?.name as LimitType) || 'default'

    const messages: Record<LimitType, string> = {
      strict: 'Too many sign-in attempts. Please wait before trying again.',
      public: 'Too many public requests. Try again later.',
      default: 'Demasiadas solicitudes. Inténtalo de nuevo más tarde.',
    }

    throw new ThrottlerException(messages[limitName])
  }
}
