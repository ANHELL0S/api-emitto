import { applyDecorators } from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiForbiddenResponse,
} from '@nestjs/swagger'

const UpdateSecretKeySwagger = {
  summary: 'Actualizar una clave',
  ApiParam: {
    name: 'id',
    description: 'ID de la clave a actualizar',
    example: 'e5ff8fd7-0178-4f50-8894-35c1bcc0ade9',
    required: true,
    schema: { type: 'string', format: 'uuid' },
  },
  ApiBody: {
    description: 'User update payload',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Updated Name', nullable: true },
        isActive: { type: 'boolean', example: true, nullable: true },
      },
    },
  },
  ApiOkResponse: {
    description: 'Clave actualizada exitosamente',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            statusCode: { type: 'number', example: 200 },
            message: {
              type: 'string',
              example: 'Clave actualizada exitosamente',
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
                name: { type: 'string', example: 'Name actualizado' },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-05-02T15:38:30.607Z',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-05-03T15:12:47.566Z',
                },
              },
            },
          },
        },
      },
    },
  },
  ApiBadRequestResponse: {
    description: 'Datos inválidos',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'array',
              items: { type: 'string' },
              example: [
                'Por favor, proporcione un ID correcto.',
                'El campo email debe ser un correo válido.',
              ],
            },
            error: { type: 'string', example: 'Bad Request' },
            statusCode: { type: 'number', example: 400 },
          },
        },
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
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Ha ocurrido un error inesperado en el servidor.',
            },
            error: { type: 'string', example: 'Internal Server Error' },
            statusCode: { type: 'number', example: 500 },
          },
        },
      },
    },
  },
}

export function DocumentUpdateSecretKey() {
  return applyDecorators(
    ApiOperation({ summary: UpdateSecretKeySwagger.summary }),
    ApiParam(UpdateSecretKeySwagger.ApiParam),
    ApiBody(UpdateSecretKeySwagger.ApiBody),
    ApiOkResponse(UpdateSecretKeySwagger.ApiOkResponse),
    ApiBadRequestResponse(UpdateSecretKeySwagger.ApiBadRequestResponse),
    ApiForbiddenResponse(UpdateSecretKeySwagger.ApiForbiddenResponse),
    ApiInternalServerErrorResponse(
      UpdateSecretKeySwagger.ApiInternalServerErrorResponse,
    ),
  )
}
