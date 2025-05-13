import { IsString, MaxLength, IsNotEmpty, IsEmail } from 'class-validator'

export class SigninDto {
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  declare email: string

  @IsNotEmpty({ message: 'La contraseña no debe estar vacia' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MaxLength(255, {
    message: 'La contraseña no puede tener más de 255 caracteres',
  })
  declare password: string
}
