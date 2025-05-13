import { applyDecorators } from '@nestjs/common'
import {
  ApiQuery,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger'

const GetAllSecretKeysSwagger = {
  summary: 'Obtener todos las claves',
  queries: [
    {
      name: 'page',
      required: false,
      type: Number,
      example: 1,
      description: 'Número de página para paginación',
    },
    {
      name: 'limit',
      required: false,
      type: Number,
      example: 10,
      description: 'Cantidad de elementos por página',
    },
    {
      name: 'search',
      required: false,
      type: String,
      example: 'maria',
      description: 'Texto para búsqueda global (name)',
    },
    {
      name: 'startDate',
      required: false,
      type: String,
      example: '2025-01-01',
      description:
        'Fecha de inicio para filtrar por rango (formato YYYY-MM-DD)',
    },
    {
      name: 'endDate',
      required: false,
      type: String,
      example: '2025-12-31',
      description: 'Fecha de fin para filtrar por rango (formato YYYY-MM-DD)',
    },
    {
      name: 'orderBy',
      required: false,
      type: String,
      example: 'createdAt',
      description:
        'Campo por el cual ordenar los resultados (createdAt, updatedAt)',
    },
    {
      name: 'sortOrder',
      required: false,
      enum: ['ASC', 'DESC'],
      example: 'ASC',
      description: 'Dirección del ordenamiento (ASC, DESC)',
    },
  ],
  ApiOkResponse: {
    description: 'Claves obtenidas exitosamente',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'integer', example: 200 },
        message: {
          type: 'string',
          example: 'Claves obtenidas exitosamente',
        },
        meta: {
          type: 'object',
          properties: {
            pagination: {
              type: 'object',
              properties: {
                query: { type: 'string', example: 'page=1&limit=10&offset=0' },
                limit: { type: 'integer', example: 10 },
                offset: { type: 'integer', example: 0 },
                totalRecords: { type: 'integer', example: 116 },
                totalPages: { type: 'integer', example: 12 },
                currentPage: { type: 'integer', example: 1 },
                hasNextPage: { type: 'boolean', example: true },
                hasPreviousPage: { type: 'boolean', example: false },
                firstPage: { type: 'integer', example: 1 },
                lastPage: { type: 'integer', example: 12 },
                nextPage: { type: 'integer', example: 2 },
                previousPage: { type: 'integer', example: null },
                perPage: { type: 'integer', example: 10 },
              },
            },
            sorting: {
              type: 'object',
              properties: {
                sortableFields: {
                  type: 'array',
                  items: { type: 'string' },
                  example: ['name', 'createdAt'],
                },
                query: { type: 'string', example: 'createdAt,ASC' },
                sort: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      field: { type: 'string', example: 'createdAt' },
                      order: { type: 'string', example: 'ASC' },
                    },
                  },
                },
              },
            },
            filtering: {
              type: 'object',
              properties: {
                filterableFields: {
                  type: 'array',
                  items: { type: 'string' },
                  example: ['name'],
                },
                query: { type: 'string', example: 'search=test key' },
                filter: { type: 'object', example: { search: 'test key' } },
              },
            },
          },
        },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                format: 'uuid',
                example: '1d4c239b-ef8c-4be2-a789-6b3e14e9ec92',
              },
              isActive: { type: 'boolean', example: true },
              name: { type: 'string', example: 'Mi key' },
              secret_key: { type: 'string', example: '8e2a388e24...0a38' },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2025-05-01T12:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2025-05-01T12:00:00.000Z',
              },
            },
          },
        },
      },
    },
  },
  ApiBadRequestResponse: {
    description: 'Parámetros de consulta inválidos',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'array',
          items: { type: 'string' },
          example: [
            'El parámetro "limit" debe ser un número.',
            'El parámetro "sortOrder" debe ser uno de: ASC, DESC',
          ],
        },
        error: { type: 'string', example: 'Bad Request' },
        statusCode: { type: 'integer', example: 400 },
      },
    },
  },
  ApiForbiddenResponse: {
    description: 'No tienes permisos para esta operación',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'No tienes permisos para acceder a este recurso',
            },
            error: { type: 'string', example: 'Forbidden' },
            statusCode: { type: 'number', example: 403 },
          },
        },
      },
    },
  },
  ApiInternalServerErrorResponse: {
    description: 'Error interno del servidor',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Ha ocurrido un error inesperado en el servidor.',
        },
        error: { type: 'string', example: 'Internal Server Error' },
        statusCode: { type: 'integer', example: 500 },
      },
    },
  },
}

export function DocumentGetAllSecretKeys() {
  return applyDecorators(
    ApiOperation({ summary: GetAllSecretKeysSwagger.summary }),
    ...GetAllSecretKeysSwagger.queries.map((query) => ApiQuery(query)),
    ApiOkResponse(GetAllSecretKeysSwagger.ApiOkResponse),
    ApiBadRequestResponse(GetAllSecretKeysSwagger.ApiBadRequestResponse),
    ApiForbiddenResponse(GetAllSecretKeysSwagger.ApiForbiddenResponse),
    ApiInternalServerErrorResponse(
      GetAllSecretKeysSwagger.ApiInternalServerErrorResponse,
    ),
  )
}
