import { genSalt, hash } from 'bcryptjs'

export async function encryptText(
  text: string,
  saltRounds: number,
): Promise<string> {
  const salt = await genSalt(saltRounds)
  return await hash(text, salt)
}
