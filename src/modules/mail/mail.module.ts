import { Module } from '@nestjs/common'
import { EmailService } from '@/modules/mail/mail.service'
import { MailController } from '@/modules/mail/mail.controller'
import { EmailQueueModule } from '@/modules/mail/email-queue.module'
import { EmailProvider } from '@/modules/mail/providers/mail.provider'
import { SecretKeyModule } from '@/modules/secret-key/secret-key.module'

@Module({
  imports: [SecretKeyModule, EmailQueueModule],
  providers: [EmailService, EmailProvider],
  controllers: [MailController],
  exports: [EmailService],
})
export class MailModule {}
