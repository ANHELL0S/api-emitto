import { InjectModel } from '@nestjs/sequelize'
import { plainToInstance } from 'class-transformer'
import { User } from '@/database/models/user.model'
import { Op, Transaction, WhereOptions } from 'sequelize'
import { createFilter } from '@/shared/utils/filtering.util'
import { Injectable, NotFoundException } from '@nestjs/common'
import { createSortingObject } from '@/shared/utils/sorting.util'
import { UserCreateDto } from '@/modules/users/dto/user-create.dto'
import { UserUpdateDto } from '@/modules/users/dto/user-update.dto'
import { createPaginationObject } from '@/shared/utils/pagination.util'
import { UserResponseDto } from '@/modules/users/dto/user-response.dto'

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    startDate: string | null = null,
    endDate: string | null = null,
    orderBy: string = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    searchField: string[] = ['name', 'email'],
    sortableFields: string[] = ['name', 'email', 'createdAt'],
  ): Promise<any> {
    const where: WhereOptions = {}

    // Filtrar por fecha si se proporcionan
    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      }
    }

    // Generar el filtro de búsqueda (se aplica globalmente en los campos indicados)
    const filter = createFilter(search, searchField)
    // Siempre fusionamos el filtro, incluso si está vacío, para que "filtering.filter" lo refleje
    Object.assign(where, filter)

    // Configurar la paginación
    const pagination = createPaginationObject(page, limit, 0) // Inicializamos con 0 registros

    // Validar que orderBy sea un campo válido; si no, usar 'createdAt'
    if (!orderBy || !sortableFields.includes(orderBy)) orderBy = 'createdAt'

    // Configurar la ordenación
    const sorting = createSortingObject(
      orderBy,
      sortOrder || 'ASC',
      sortableFields,
    )

    // Ejecutar la consulta
    const { rows, count } = await this.userModel.findAndCountAll({
      where,
      limit,
      offset: pagination.offset,
      order: sorting.sort.map((item) => [item.field, item.order]),
    })

    if (count === 0) throw new NotFoundException('No se encontraron usuarios')

    // Actualizar la paginación con los datos reales
    pagination.totalRecords = count
    pagination.totalPages = Math.ceil(count / limit)
    pagination.hasNextPage = page * limit < count
    pagination.hasPreviousPage = page > 1
    pagination.lastPage = pagination.totalPages > 0 ? pagination.totalPages : 1
    pagination.nextPage = page < pagination.totalPages ? page + 1 : null
    pagination.previousPage = page > 1 ? page - 1 : null

    // Convertir los resultados a instancias de DTO
    const plainUsers = rows.map((user) => user.toJSON())

    return {
      meta: {
        pagination,
        sorting,
        filtering: {
          filterableFields: searchField,
          query: `search=${search}`,
          filter,
        },
      },
      data: plainToInstance(UserResponseDto, plainUsers, {
        excludeExtraneousValues: true,
      }),
    }
  }

  async findById(id: string): Promise<{ data: UserResponseDto }> {
    const userFound = await this.userModel.findByPk(id)
    if (!userFound) throw new NotFoundException('Usuario no encontrado')

    return {
      data: plainToInstance(UserResponseDto, userFound.toJSON(), {
        excludeExtraneousValues: true,
      }),
    }
  }

  async create(
    createUserDto: UserCreateDto,
    transaction: Transaction,
  ): Promise<UserResponseDto> {
    const userData = plainToInstance(User, {
      ...createUserDto,
    })

    const user = await this.userModel.create(userData.toJSON(), {
      transaction,
    })

    return plainToInstance(UserResponseDto, user.toJSON(), {
      excludeExtraneousValues: true,
    })
  }

  async update(
    id: string,
    updateUserDto: UserUpdateDto,
    transaction: Transaction,
  ): Promise<UserResponseDto> {
    const user = await this.userModel.findByPk(id)
    if (!user) {
      throw new NotFoundException('Usuario no encontrado')
    }

    const updatedUser = await user?.update(updateUserDto, { transaction })
    return plainToInstance(UserResponseDto, updatedUser?.toJSON(), {
      excludeExtraneousValues: true,
    })
  }

  async delete(id: string, transaction: Transaction): Promise<UserResponseDto> {
    const userFound = await this.userModel.findByPk(id, { transaction })
    if (!userFound) throw new NotFoundException('Usuario no encontrado')

    const user = plainToInstance(UserResponseDto, userFound.toJSON(), {
      excludeExtraneousValues: true,
    })

    await userFound.destroy({ transaction })

    return user
  }
}
