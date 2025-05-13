export interface AuthRequest extends Request {
  user: {
    userId: string
    iat: number
    exp: number
  }
}
