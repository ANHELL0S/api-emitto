import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/sequelize'
import { plainToInstance } from 'class-transformer'
import { User } from '@/database/models/user.model'
import { SigninDto } from '@/modules/auth/dto/singin.dto'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { SigninResponseDto } from '@/modules/auth/dto/signin-response.dto'
import * as bcrypt from 'bcrypt'
import { getJwtExpiration } from '@/shared/helpers/getJwtExpiration.helper'

@Injectable()
export class SigninCommandService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto): Promise<SigninResponseDto> {
    const user = await this.userModel.findOne({
      where: { email: signinDto.email },
    })

    if (!user) throw new UnauthorizedException('Credenciales inválidas')

    const hashedPassword = user.getDataValue('password')
    const isPasswordValid = await bcrypt.compare(
      signinDto.password,
      hashedPassword,
    )

    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciales inválidas')

    const payload = { userId: user._id }
    const accessToken = this.jwtService.sign(payload)

    // Llamamos al helper formatear tiempo - ms library
    const { expiresIn } = getJwtExpiration()

    return plainToInstance(
      SigninResponseDto,
      {
        accessToken,
        expiresIn,
      },
      { excludeExtraneousValues: true },
    )
  }

  async validateUser(signinDto: SigninDto) {
    const user = await this.userModel.findOne({
      where: { email: signinDto.email },
    })
    if (!user) throw new UnauthorizedException('Credenciales inválidas')

    const hashedPassword = user.getDataValue('password')
    const isPasswordValid = await bcrypt.compare(
      signinDto.password,
      hashedPassword,
    )

    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciales inválidas')

    return user
  }
}
