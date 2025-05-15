import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { EmailProvider } from '@/modules/mail/providers/mail.provider'
import { EmailQueueProcessor } from '@/modules/mail/email-queue.processor'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailQueue', // Nombre de la cola
      settings: {
        stalledInterval: 300000, // 5 min para reintentar trabajos colgados
        maxStalledCount: 3,
        guardInterval: 2000, // Frecuencia de verificación de trabajos
      },
      limiter: {
        max: 1000, // Máx 1000 trabajos/intervalo
        duration: 5000, // en 5 segundos
      },
      defaultJobOptions: {
        removeOnComplete: false, // Eliminar trabajos completados
        attempts: 3, // Reintentos
        backoff: { type: 'exponential', delay: 1000 }, // Retry exponencial
      },
    }),
  ],
  providers: [EmailQueueProcessor, EmailProvider],
  exports: [BullModule],
})
export class EmailQueueModule {}
