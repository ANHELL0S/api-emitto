import { applyDecorators } from '@nestjs/common'
import {
  ApiParam,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger'

const GetUserByIdSwagger = {
  summary: 'Obtener usuario por su ID',
  ApiParam: {
    name: 'id',
    description: 'ID del usuario',
    example: 'e5ff8fd7-a178-4f50-8894-351bcc8ade9',
    required: true,
    type: 'string',
  },
  ApiOkResponse: {
    description: 'Usuario obtenido exitosamente',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'integer', example: 200 },
        message: { type: 'string', example: 'Usuario obtenido exitosamente' },
        data: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              format: 'uuid',
              example: 'e5ff8fd7-0178-4f50-8894-35c1bcc0ade9',
            },
            isActive: { type: 'boolean', example: true },
            name: { type: 'string', example: 'Ora Rosenbaum' },
            email: {
              type: 'string',
              format: 'email',
              example: 'Richie13@example.net',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-05-02T15:38:30.607Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-05-02T15:38:30.607Z',
            },
          },
        },
      },
    },
  },
  ApiBadRequestResponse: {
    description: 'ID inválido',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Por favor, proporcione un ID correcto.'],
        },
        error: { type: 'string', example: 'Bad Request' },
        statusCode: { type: 'integer', example: 400 },
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

export function DocumentGetUserById() {
  return applyDecorators(
    ApiOperation({ summary: GetUserByIdSwagger.summary }),
    ApiParam(GetUserByIdSwagger.ApiParam),
    ApiOkResponse(GetUserByIdSwagger.ApiOkResponse),
    ApiBadRequestResponse(GetUserByIdSwagger.ApiBadRequestResponse),
    ApiInternalServerErrorResponse(
      GetUserByIdSwagger.ApiInternalServerErrorResponse,
    ),
  )
}
