import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EmailProvider {
  transporter: nodemailer.Transporter

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      pool: true, // Enable connection pooling
      maxConnections: 5, // optional – defaults to 5
      maxMessages: 100, // optional – defaults to 100
      rateLimit: 10, // mails por segundo
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
      tls: {
        rejectUnauthorized: false, // a veces necesario en producción
      },
    })
  }

  async sendEmail(
    from: string,
    subjectEmail: string,
    sendTo: string[],
    html: string,
    attachments?: { filename: string; path: string }[],
  ) {
    await this.transporter.sendMail({
      from: from,
      to: sendTo.join(','),
      subject: subjectEmail,
      html: html,
      attachments,
    })
  }
}
