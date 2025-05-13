import { IsUUID } from 'class-validator'

export class UserIdDto {
  @IsUUID('4', {
    message: 'Por favor, proporcione un ID correcto.',
  })
  declare id: string
}
