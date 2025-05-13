import { Queue } from 'bull'
import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { SendEmailDto } from '@/modules/mail/dto/send-email.dto'

@Injectable()
export class EmailService {
  constructor(@InjectQueue('emailQueue') private emailQueue: Queue) {}

  async sendEmail(body: SendEmailDto) {
    await this.emailQueue.add('sendEmail', body)
    return { success: true, message: 'Correo encolado para envío' }
  }
}
