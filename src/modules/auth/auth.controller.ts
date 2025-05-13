import { CommandBus } from '@nestjs/cqrs'
import { JwtAuthGuard } from '@/guards/jwt.guard'
import { SigninDto } from '@/modules/auth/dto/singin.dto'
import { SigninResponseDto } from '@/modules/auth/dto/signin-response.dto'
import { SigninCommand } from '@/modules/auth/commands/impl/singin.command'
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { AuthRequest } from '@/modules/auth/decors/user.decorator'
import { DocumentWithBearerAuth } from './docs/swagger/status.swagger'
import { DocumentSigninUser } from '@/modules/auth/docs/swagger/signin.swagger'

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Throttle({ strict: { limit: 5, ttl: 60000 } })
  @Post('signin')
  @DocumentSigninUser()
  async signin(
    @Body() signinDto: SigninDto,
    @Res({ passthrough: true }) res: import('express').Response,
  ): Promise<any> {
    const result: { data: SigninResponseDto } = await this.commandBus.execute(
      new SigninCommand(signinDto),
    )

    // Cookie HTTP-only (seguridad)
    res.cookie('accessToken', result.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true en producción
      sameSite: 'none',
      domain:
        process.env.NODE_ENV === 'development' ? 'localhost' : 'softecsa.com',
      maxAge: 3600000, // 1 hora
      path: '/',
    })

    return {
      success: true,
      statusCode: 200,
      message: 'Sesión iniciada exitosamente',
      data: {
        accessToken: result.data.accessToken,
        expiresIn: result.data.expiresIn,
      },
    }
  }

  @Throttle({ strict: { limit: 60, ttl: 60000 } })
  @Get('status')
  @UseGuards(JwtAuthGuard)
  @DocumentWithBearerAuth()
  status(@Req() req: AuthRequest) {
    return {
      success: true,
      statusCode: 200,
      message: 'Sesión valida',
      data: req.user,
    }
  }

  @Throttle({ strict: { limit: 5, ttl: 60000 } })
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: import('express').Response) {
    // Remove the access token cookie
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      domain:
        process.env.NODE_ENV === 'development' ? 'localhost' : 'softecsa.com',
      path: '/',
    })

    return {
      success: true,
      statusCode: 200,
      message: 'Sesión cerrada exitosamente',
    }
  }
}
