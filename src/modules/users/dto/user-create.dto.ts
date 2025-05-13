import { IsEmail, IsString, MaxLength, IsNotEmpty } from 'class-validator'

export class UserCreateDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString({ message: 'El nombre no es válido' })
  @MaxLength(255, {
    message: 'El nombre no puede tener más de 255 caracteres',
  })
  declare name: string

  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  declare email: string

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @IsString({ message: 'La contraseña no es válida' })
  @MaxLength(255, {
    message: 'La contraseña no puede tener más de 255 caracteres',
  })
  declare password: string
}
