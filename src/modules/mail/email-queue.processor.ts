import {
  Process,
  Processor,
  OnQueueFailed,
  OnQueueCompleted,
} from '@nestjs/bull'
import { Job } from 'bull'
import { unlink } from 'fs/promises'
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

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { attachments } = job.data
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (attachments?.length) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await this.deleteAttachments(attachments)
    }
  }

  @OnQueueFailed()
  async onFailed(job: Job) {
    if (job.attemptsMade >= (job.opts?.attempts || 0)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { attachments } = job.data
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (attachments?.length) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await this.deleteAttachments(attachments)
      }
    }
  }

  private async deleteAttachments(
    attachments: { filename: string; path?: string }[],
  ) {
    const deletePromises = attachments.map(async (attachment) => {
      if (!attachment?.path) {
        console.warn(
          `Skipping deletion - no path provided for attachment: ${attachment.filename}`,
        )
        return
      }

      try {
        await unlink(attachment.path)
        console.log(`File deleted successfully: ${attachment.path}`)
      } catch (err) {
        if (err) {
          console.warn(`File not found, skipping: ${attachment.path}`)
        } else {
          console.error(`Error deleting file ${attachment.path}:`, err)
        }
      }
    })

    await Promise.all(deletePromises)
  }
}
