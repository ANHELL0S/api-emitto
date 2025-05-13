import {
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
  IsString,
  IsBoolean,
} from 'class-validator'

export class UserUpdateDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(255, { message: 'El nombre no puede tener más de 255 caracteres' })
  name?: string

  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email?: string

  @IsOptional()
  @IsBoolean({ message: 'El valor debe ser un booleano' })
  isActive?: boolean

  @IsOptional()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(20, {
    message: 'La contraseña no puede tener más de 20 caracteres',
  })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
  })
  password?: string
}
