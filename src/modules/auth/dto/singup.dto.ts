import { IsEmail, IsString, MaxLength, IsNotEmpty } from 'class-validator'

export class SignupDto {
  @IsNotEmpty({ message: 'La id_session no debe estar vacia' })
  @IsString({ message: 'La id_session debe ser una cadena de texto' })
  @MaxLength(255, {
    message: 'La id_session no puede tener más de 255 caracteres',
  })
  declare googleId: string

  @IsNotEmpty({ message: 'La imagen no puede estar vacía' })
  declare image: string

  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString({ message: 'El nombre no es válido' })
  @MaxLength(255, {
    message: 'El nombre no puede tener más de 255 caracteres',
  })
  declare name: string

  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  declare email: string
}
