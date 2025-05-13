import { Expose } from 'class-transformer'

export class SigninResponseDto {
  @Expose()
  declare user: {
    _id: string
  }

  @Expose()
  declare accessToken: string

  @Expose()
  declare expiresIn: number
}

export interface ApiResponse {
  success: boolean
  statusCode: number
  message: string
}
