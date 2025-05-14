import { Throttle } from '@nestjs/throttler'
import { SecretKeyGuard } from '@/guards/api-key.guard'
import { EmailService } from '@/modules/mail/mail.service'
import { AttachmentDto, SendEmailDto } from '@/modules/mail/dto/send-email.dto'
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { DocumentSendMail } from '@/modules/mail/docs/swagger/send-mail.swagger'
import { FilesInterceptor } from '@nestjs/platform-express'

@Controller('email')
export class MailController {
  constructor(private readonly emailService: EmailService) {}

  /*
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
  */

  // Actualización para el controlador NestJS

  @Throttle({ strict: { limit: 30, ttl: 60000 } })
  @Post('send')
  @UseGuards(SecretKeyGuard)
  @UseInterceptors(FilesInterceptor('attachments'))
  @DocumentSendMail()
  async send(
    @Body() dto: SendEmailDto,
    @UploadedFiles() uploadedFiles: Express.Multer.File[],
  ): Promise<any> {
    console.log('Recibido en el backend:', dto)
    // console.log('Archivos recibidos:', uploadedFiles?.length || 0)

    try {
      // Inicializar array para todos los adjuntos (combinados)
      let finalAttachments: AttachmentDto[] = []

      // 1. Procesar URL attachments si vienen en el campo 'urlAttachments'
      if (dto.urlAttachments) {
        try {
          const urlAttachments = JSON.parse(dto.urlAttachments)
          if (Array.isArray(urlAttachments)) {
            finalAttachments = [...finalAttachments, ...urlAttachments]
            //.log('URL attachments procesados:', urlAttachments.length)
          }
        } catch (e) {
          console.error('Error al parsear urlAttachments:', e)
        }
      }

      // 2. Procesar attachments que ya vienen en el DTO (para peticiones JSON)
      if (
        dto.attachments &&
        Array.isArray(dto.attachments) &&
        dto.attachments.length > 0
      ) {
        finalAttachments = [...finalAttachments, ...dto.attachments]
        //console.log('DTO attachments procesados:', dto.attachments.length)
      }

      // 3. Si hay archivos subidos, procesarlos
      if (uploadedFiles && uploadedFiles.length > 0) {
        const uploadedAttachments: AttachmentDto[] = await Promise.all(
          uploadedFiles.map(async (file) => {
            const attachment = await this.emailService.storeFile(file)
            //console.log('Archivo procesado:', file.originalname)
            return {
              filename: file.originalname,
              path: attachment.path,
            }
          }),
        )

        finalAttachments = [...finalAttachments, ...uploadedAttachments]
        // console.log('Archivos subidos procesados:', uploadedFiles.length)
      }

      // 4. Asignar todos los adjuntos procesados al DTO
      dto.attachments = finalAttachments

      //console.log('Total de adjuntos finales:', finalAttachments.length)

      // 5. Enviar el correo con todos los adjuntos
      const result = await this.emailService.sendEmail(dto)

      return {
        succes: result,
        statusCode: 200,
        message: 'Correo/s enviados exitosamente',
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error)
      return {
        statusCode: 500,
        message: 'Error al enviar el correo. Inténtalo nuevamente.',
      }
    }
  }
}
