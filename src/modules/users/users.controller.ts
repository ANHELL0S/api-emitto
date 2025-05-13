import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Controller,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '@/guards/jwt.guard'
import { CookieAuthGuard } from '@/guards/cookie.guard'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { UserIdDto } from '@/modules/users/dto/user-id.dto'
import { UserCreateDto } from '@/modules/users/dto/user-create.dto'
import { UserUpdateDto } from '@/modules/users/dto/user-update.dto'
import { UserResponseDto } from '@/modules/users/dto/user-response.dto'
import { GetAllUsersQuery } from '@/modules/users/queries/impl/get-all-users.query'
import { GetUserByIdQuery } from '@/modules/users/queries/impl/get-user-by-id.query'
import { CreateUserCommand } from '@/modules/users/commands/impl/create-user.command'
import { UpdateUserCommand } from '@/modules/users/commands/impl/update-user.command'
import { DeleteUserCommand } from '@/modules/users/commands/impl/delete-user.command'
import { DocumentCreateUser } from '@/modules/users/docs/swagger/create-user.swagger'
import { DocumentGetAllUsers } from '@/modules/users/docs/swagger/getAll-user.swagger'
import { DocumentUpdateUser } from '@/modules/users/docs/swagger/update-user.swagger'
import { DocumentDeleteUser } from '@/modules/users/docs/swagger/delete-user.swagger'
import { DocumentGetUserById } from '@/modules/users/docs/swagger/getById-user.swagger'

@Controller('user')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Obtiene una lista de usuarios con paginación, filtros de búsqueda y ordenación.
   *
   * @param {number} page - Número de página a obtener (por defecto 1).
   * @param {number} limit - Número de registros por página (por defecto 10).
   * @param {string} search - Término de búsqueda aplicado a los campos 'name' y 'email'.
   * @param {string} startDate - Fecha de inicio para filtrar usuarios por la fecha de creación (aaaa-mm-dd).
   * @param {string} endDate - Fecha de fin para filtrar usuarios por la fecha de creación (aaaa-mm-dd).
   * @param {string} orderBy - Campo por el cual ordenar los resultados (por defecto 'createdAt').
   * @param {string} sortOrder - Dirección de ordenación, 'ASC' o 'DESC' (por defecto 'ASC').
   *
   * http://localhost:3000/users?page=1&limit=5&search=Garcia&startDate=2023-03-01&endDate=2024-04-01&orderBy=&sortOrder=
   *
   */

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(CookieAuthGuard)
  @DocumentGetAllUsers()
  async getUsers(
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
      new GetAllUsersQuery(
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
      message: 'Usuarios obtenidos exitosamente',
      ...result,
    }
  }

  @Get(':id')
  @DocumentGetUserById()
  async getUserById(@Param() params: UserIdDto): Promise<any> {
    const result = await this.queryBus.execute<{ data: UserResponseDto }>(
      new GetUserByIdQuery(params.id),
    )

    return {
      success: true,
      statusCode: 200,
      message: 'Usuario obtenido exitosamente',
      ...result,
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @DocumentCreateUser()
  async createUser(@Body() createUserDto: UserCreateDto): Promise<any> {
    const result: { data: UserResponseDto } = await this.commandBus.execute(
      new CreateUserCommand(createUserDto),
    )

    return {
      success: true,
      statusCode: 201,
      message: 'Usuario creado correctamente',
      ...result,
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @DocumentUpdateUser()
  async updateUser(
    @Param() params: UserIdDto,
    @Body() updateUserDto: UserUpdateDto,
  ): Promise<any> {
    const result: { data: UserResponseDto } = await this.commandBus.execute(
      new UpdateUserCommand(params.id, updateUserDto),
    )

    return {
      success: true,
      statusCode: 200,
      message: 'Usuario actualizado exitosamente',
      data: result,
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @DocumentDeleteUser()
  async deleteUser(@Param() params: UserIdDto) {
    const result: { data: UserResponseDto } = await this.commandBus.execute(
      new DeleteUserCommand(params.id),
    )

    return {
      success: true,
      statusCode: 200,
      message: 'Usuario eliminado exitosamente',
      data: result,
    }
  }
}
