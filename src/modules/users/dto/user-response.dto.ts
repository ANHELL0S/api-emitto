import { Expose, Exclude } from 'class-transformer'

export class UserResponseDto {
  @Expose()
  declare _id: string

  @Expose()
  declare isActive: boolean

  @Expose()
  declare name: string

  @Expose()
  declare email: string

  @Exclude()
  declare password: string

  @Expose()
  declare createdAt: Date

  @Expose()
  declare updatedAt: Date
}
