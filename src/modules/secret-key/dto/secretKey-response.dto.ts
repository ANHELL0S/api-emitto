import { Expose } from 'class-transformer'

export class SecretKeyResponseDto {
  @Expose()
  declare _id: string

  @Expose()
  declare isActive: boolean

  @Expose()
  declare name: string

  @Expose()
  declare secret_key: string

  @Expose()
  declare createdAt: Date

  @Expose()
  declare updatedAt: Date
}
