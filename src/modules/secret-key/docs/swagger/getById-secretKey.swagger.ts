import { applyDecorators } from '@nestjs/common'
import {
  ApiParam,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger'

const GetSecretKeyByIdSwagger = {
  summary: 'Obtener clave por su ID',
  ApiParam: {
    name: 'id',
    description: 'ID de la secret_key',
    example: 'e5ff8fd7-a178-4f50-8894-351bcc8ade9',
    required: true,
    type: 'string',
  },
  ApiOkResponse: {
    description: 'Clave obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        statusCode: { type: 'integer', example: 200 },
        message: {
          type: 'string',
          example: 'Clave obtenida exitosamente',
        },
        data: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              format: 'uuid',
              example: 'e5ff8fd7-0178-4f50-8894-35c1bcc0ade9',
            },
            isActive: { type: 'boolean', example: true },
            name: { type: 'string', example: 'My clave' },
            secret_key: { type: 'string', example: '8e2a388e24...0a38' },
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

export function DocumentGetSecretKeyById() {
  return applyDecorators(
    ApiOperation({ summary: GetSecretKeyByIdSwagger.summary }),
    ApiParam(GetSecretKeyByIdSwagger.ApiParam),
    ApiOkResponse(GetSecretKeyByIdSwagger.ApiOkResponse),
    ApiBadRequestResponse(GetSecretKeyByIdSwagger.ApiBadRequestResponse),
    ApiInternalServerErrorResponse(
      GetSecretKeyByIdSwagger.ApiInternalServerErrorResponse,
    ),
  )
}
