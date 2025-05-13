import { IsOptional, IsString, MaxLength, IsBoolean } from 'class-validator'

export class SecretKeyUpdateDto {
  @IsOptional()
  @IsString({ message: 'El nombre no es válida' })
  @MaxLength(255, {
    message: 'El nombre no puede tener más de 255 caracteres',
  })
  declare name?: string

  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser un valor booleano' })
  declare isActive?: boolean
}
