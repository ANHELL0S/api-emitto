import { Job } from 'bull'
import { Process, Processor } from '@nestjs/bull'
import { EmailProvider } from '@/modules/mail/providers/mail.provider'

@Processor('emailQueue')
export class EmailQueueProcessor {
  constructor(private emailProvider: EmailProvider) {}

  @Process('sendEmail')
  async handleSendEmail(
    job: Job<{
      from: string
      subjectEmail: string
      sendTo: string[]
      message: string
      attachments?: { filename: string; path: string }[]
    }>,
  ) {
    const { from, subjectEmail, sendTo, message, attachments } = job.data
    await this.emailProvider.sendEmail(
      from,
      subjectEmail,
      sendTo,
      message,
      attachments,
    )
  }
}
