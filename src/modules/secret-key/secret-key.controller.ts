import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { JwtAuthGuard } from '@/guards/jwt.guard'
import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Query,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common'
import { CookieAuthGuard } from '@/guards/cookie.guard'
import { SecretKeyIdDto } from '@/modules/secret-key/dto/secretKey-id.dto'
import { SecretKeyCreateDto } from '@/modules/secret-key/dto/secretKey-create.dto'
import { SecretKeyUpdateDto } from '@/modules/secret-key/dto/secretKey-update.dto'
import { SecretKeyResponseDto } from '@/modules/secret-key/dto/secretKey-response.dto'
import { GetAllSecretKeyQuery } from '@/modules/secret-key/queries/impl/get-all-secretKeys.query'
import { GetSecretKeyByIdQuery } from '@/modules/secret-key/queries/impl/get-secretKey-by-id.query'
import { CreateSecretKeyCommand } from '@/modules/secret-key/commands/impl/create-secretKey.command'
import { DocumentCreateSecretKey } from '@/modules/secret-key/docs/swagger/create-secretKey.swagger'
import { DeleteSecretKeyCommand } from '@/modules/secret-key/commands/impl/delete-secretKey.command'
import { UpdateSecretKeyCommand } from '@/modules/secret-key/commands/impl/update-secretKey.command'
import { DocumentDeleteSecretKey } from '@/modules/secret-key/docs/swagger/delete-secretKey.swagger'
import { DocumentUpdateSecretKey } from '@/modules/secret-key/docs/swagger/update-secretKey.swagger'
import { DocumentGetAllSecretKeys } from '@/modules/secret-key/docs/swagger/getAll-secretKey.swagger'
import { DocumentGetSecretKeyById } from '@/modules/secret-key/docs/swagger/getById-secretKey.swagger'
import { SkipThrottle, Throttle } from '@nestjs/throttler'

@Controller('secret-key')
export class SecretKeyController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Throttle({ default: { ttl: 60000, limit: 60 } })
  @Get()
  @UseGuards(JwtAuthGuard, CookieAuthGuard)
  @DocumentGetAllSecretKeys()
  async getAllSecretKeys(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('startDate') startDate: string | null = null,
    @Query('endDate') endDate: string | null = null,
    @Query('orderBy') orderBy: string = 'createdAt',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<any> {
    const parsedStartDate = startDate ? new Date(startDate) : null
    const parsedEndDate = endDate ? new Date(endDate) : null

    const result = await this.queryBus.execute(
      new GetAllSecretKeyQuery(
        page,
        limit,
        search,
        parsedStartDate,
        parsedEndDate,
        orderBy,
        sortOrder,
      ),
    )

    return {
      success: true,
      statusCode: 200,
      message: 'Secret keys obtenidas exitosamente',
      ...result,
    }
  }

  @Throttle({ default: { ttl: 60000, limit: 60 } })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @DocumentGetSecretKeyById()
  async getUserById(@Param() params: SecretKeyIdDto): Promise<any> {
    const result = await this.queryBus.execute<{ data: SecretKeyResponseDto }>(
      new GetSecretKeyByIdQuery(params.id),
    )

    return {
      success: true,
      statusCode: 200,
      message: 'Secret key obtenida exitosamente',
      ...result,
    }
  }

  @Throttle({ default: { ttl: 60000, limit: 60 } })
  @Post()
  @UseGuards(JwtAuthGuard)
  @DocumentCreateSecretKey()
  async createUser(
    @Body() createSecretKeyDto: SecretKeyCreateDto,
  ): Promise<any> {
    const result: { data: SecretKeyResponseDto } =
      await this.commandBus.execute(
        new CreateSecretKeyCommand(createSecretKeyDto),
      )

    return {
      success: true,
      statusCode: 201,
      message: 'Clave creada exitosamente',
      ...result,
    }
  }

  @Throttle({ default: { ttl: 60000, limit: 60 } })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @DocumentUpdateSecretKey()
  async updateUser(
    @Param() params: SecretKeyIdDto,
    @Body() secretKeyUpdateDto: SecretKeyUpdateDto,
  ): Promise<any> {
    const result: { data: SecretKeyResponseDto } =
      await this.commandBus.execute(
        new UpdateSecretKeyCommand(params.id, secretKeyUpdateDto),
      )

    return {
      success: true,
      statusCode: 200,
      message: 'Clave actualizada exitosamente',
      data: result,
    }
  }

  @Throttle({ default: { ttl: 60000, limit: 60 } })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @DocumentDeleteSecretKey()
  async deleteUser(@Param() params: SecretKeyIdDto) {
    const result: { data: SecretKeyResponseDto } =
      await this.commandBus.execute(new DeleteSecretKeyCommand(params.id))

    return {
      success: true,
      statusCode: 200,
      message: 'Clave eliminada exitosamente',
      data: result,
    }
  }
}
