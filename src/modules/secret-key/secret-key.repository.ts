import { InjectModel } from '@nestjs/sequelize'
import { plainToInstance } from 'class-transformer'
import { Op, Transaction, WhereOptions } from 'sequelize'
import { createFilter } from '@/shared/utils/filtering.util'
import { Injectable, NotFoundException } from '@nestjs/common'
import { SecretKey } from '@/database/models/secret-key.model'
import { createSortingObject } from '@/shared/utils/sorting.util'
import { createPaginationObject } from '@/shared/utils/pagination.util'
import { SecretKeyCreateDto } from '@/modules/secret-key/dto/secretKey-create.dto'
import { SecretKeyUpdateDto } from '@/modules/secret-key/dto/secretKey-update.dto'
import { SecretKeyResponseDto } from '@/modules/secret-key/dto/secretKey-response.dto'

@Injectable()
export class SecretKeyRepository {
  constructor(
    @InjectModel(SecretKey) private readonly secretKeyModel: typeof SecretKey,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    startDate: string | null = null,
    endDate: string | null = null,
    orderBy: string = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    searchField: string[] = ['name'],
    sortableFields: string[] = ['name', 'createdAt'],
  ): Promise<any> {
    const where: WhereOptions = {}

    // Filtro por fecha
    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      }
    }

    // Filtro de búsqueda
    const filter = createFilter(search, searchField)
    Object.assign(where, filter)

    // Paginación
    const pagination = createPaginationObject(page, limit, 0)

    // Validar orderBy
    if (!orderBy || !sortableFields.includes(orderBy)) orderBy = 'createdAt'

    // Ordenamiento
    const sorting = createSortingObject(
      orderBy,
      sortOrder || 'ASC',
      sortableFields,
    )

    // 1. Obtener total sin filtros
    const totalRecords = await this.secretKeyModel.count()

    // 2. Obtener datos filtrados
    const { rows, count: filteredRecords } =
      await this.secretKeyModel.findAndCountAll({
        where,
        limit,
        offset: pagination.offset,
        order: sorting.sort.map((item) => [item.field, item.order]),
      })

    // if (filteredRecords === 0)
    // throw new NotFoundException('No se encontraron secret key')

    // Actualizar paginación
    pagination.totalRecords = totalRecords // total sin filtros
    pagination.filteredRecords = filteredRecords // total con filtros
    pagination.totalPages = Math.ceil(filteredRecords / limit)
    pagination.hasNextPage = page * limit < filteredRecords
    pagination.hasPreviousPage = page > 1
    pagination.lastPage = pagination.totalPages > 0 ? pagination.totalPages : 1
    pagination.nextPage = page < pagination.totalPages ? page + 1 : null
    pagination.previousPage = page > 1 ? page - 1 : null

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
      data:
        filteredRecords === 0
          ? []
          : plainToInstance(
              SecretKeyResponseDto,
              rows.map((data) => data.toJSON()),
              {
                excludeExtraneousValues: true,
              },
            ),
    }
  }

  async findById(id: string): Promise<{ data: SecretKeyResponseDto }> {
    const dataFound = await this.secretKeyModel.findByPk(id)
    if (!dataFound) throw new NotFoundException('Secret key no encontrada')

    return {
      data: plainToInstance(SecretKeyResponseDto, dataFound.toJSON(), {
        excludeExtraneousValues: true,
      }),
    }
  }

  async create(
    createDto: SecretKeyCreateDto,
    transaction: Transaction,
  ): Promise<SecretKeyResponseDto> {
    const secretKeyData = plainToInstance(SecretKey, {
      ...createDto,
    })

    const createdData = await this.secretKeyModel.create(
      secretKeyData.toJSON(),
      {
        transaction,
      },
    )

    return plainToInstance(SecretKeyResponseDto, createdData.toJSON(), {
      excludeExtraneousValues: true,
    })
  }

  async update(
    id: string,
    updateDto: SecretKeyUpdateDto,
    transaction: Transaction,
  ): Promise<SecretKeyResponseDto> {
    const dataFound = await this.secretKeyModel.findByPk(id)
    if (!dataFound) throw new NotFoundException('Secret key no encontrada')

    const updatedData = await dataFound?.update(updateDto, { transaction })
    return plainToInstance(SecretKeyResponseDto, updatedData?.toJSON(), {
      excludeExtraneousValues: true,
    })
  }

  async delete(
    id: string,
    transaction: Transaction,
  ): Promise<SecretKeyResponseDto> {
    const dataFound = await this.secretKeyModel.findByPk(id, { transaction })
    if (!dataFound) throw new NotFoundException('Secret key no encontrada')

    const deletedData = plainToInstance(
      SecretKeyResponseDto,
      dataFound.toJSON(),
      {
        excludeExtraneousValues: true,
      },
    )

    await dataFound.destroy({ transaction })

    return deletedData
  }
}
