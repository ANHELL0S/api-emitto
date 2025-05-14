import { Queue } from 'bull'
import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { SendEmailDto } from '@/modules/mail/dto/send-email.dto'

import * as path from 'path'
import * as fs from 'fs'
import { ConfigService } from '@nestjs/config'
import { AttachmentDto } from '@/modules/mail/dto/send-email.dto'

@Injectable()
export class EmailService {
  constructor(
    @InjectQueue('emailQueue')
    private emailQueue: Queue,
    private readonly configService: ConfigService,
  ) {}

  // Método para almacenar un archivo y devolver un AttachmentDto
  async storeFile(file: Express.Multer.File): Promise<AttachmentDto> {
    const uploadDir = this.configService.get('UPLOAD_DIR') || 'uploads'
    const fileName = `${Date.now()}_${file.originalname}`
    const filePath = path.join(uploadDir, fileName)

    // Si el directorio no existe, lo creamos
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    // Guardar el archivo en el sistema de archivos local
    fs.writeFileSync(filePath, file.buffer)

    // Crear y devolver el objeto AttachmentDto
    return {
      filename: file.originalname,
      path: filePath,
    }
  }

  async sendEmail(body: SendEmailDto) {
    await this.emailQueue.add('sendEmail', body)
    return { success: true, message: 'Correo encolado para envío' }
  }
}
