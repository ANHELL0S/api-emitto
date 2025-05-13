import { IsString, MaxLength, IsNotEmpty } from 'class-validator'

export class SecretKeyCreateDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacía' })
  @IsString({ message: 'El nombre no es válida' })
  @MaxLength(255, {
    message: 'El nombre no puede tener más de 255 caracteres',
  })
  declare name: string
}
