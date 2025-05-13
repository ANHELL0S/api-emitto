import {
  IsString,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

class AttachmentDto {
  @IsString()
  declare filename: string

  @IsString()
  declare path: string
}

export class SendEmailDto {
  @IsString({ message: 'El campo "from" debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El campo "from" no puede estar vacío.' })
  declare from: string

  @IsString({
    message: 'El campo "subjectEmail" debe ser una cadena de texto.',
  })
  @IsNotEmpty({ message: 'El campo "subjectEmail" no puede estar vacío.' })
  declare subjectEmail: string

  @IsNotEmpty({ message: 'El campo "subjectEmail" no puede estar vacío.' })
  @IsArray({
    message: 'El campo "sendTo" debe ser un arreglo de correos electrónicos.',
  })
  @IsEmail(
    {},
    {
      each: true,
      message:
        'Cada dirección en "sendTo" debe ser un correo electrónico válido.',
    },
  )
  declare sendTo: string[]

  @IsString({ message: 'El campo "message" debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El campo "message" no puede estar vacío.' })
  declare message: string

  @IsOptional()
  @IsArray({ message: 'El campo "attachments" debe ser un arreglo.' })
  @ValidateNested({
    each: true,
    message:
      'Cada archivo adjunto debe ser un objeto válido de tipo AttachmentDto.',
  })
  @Type(() => AttachmentDto)
  declare attachments?: AttachmentDto[]
}
