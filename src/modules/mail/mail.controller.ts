import { Throttle } from '@nestjs/throttler'
import { SecretKeyGuard } from '@/guards/api-key.guard'
import { EmailService } from '@/modules/mail/mail.service'
import { SendEmailDto } from '@/modules/mail/dto/send-email.dto'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { DocumentSendMail } from '@/modules/mail/docs/swagger/send-mail.swagger'

@Controller('email')
export class MailController {
  constructor(private readonly emailService: EmailService) {}

  @Throttle({ strict: { limit: 30, ttl: 60000 } })
  @Post('send')
  @UseGuards(SecretKeyGuard)
  @DocumentSendMail()
  async send(@Body() dto: SendEmailDto): Promise<any> {
    const result = await this.emailService.sendEmail(dto)
    return {
      succes: result,
      statusCode: 200,
      message: 'Correo/s enviados exitosamente',
    }
  }
}
