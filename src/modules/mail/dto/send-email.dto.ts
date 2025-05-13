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
  @IsString()
  @IsNotEmpty()
  declare from: string

  @IsString()
  @IsNotEmpty()
  declare subjectEmail: string

  @IsArray()
  @IsEmail({}, { each: true })
  declare sendTo: string[]

  @IsString()
  @IsNotEmpty()
  declare message: string

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  declare attachments?: AttachmentDto[]
}
