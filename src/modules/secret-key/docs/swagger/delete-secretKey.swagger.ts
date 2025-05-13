import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger'

const DeleteSecretKeySwagger = {
  summary: 'Eliminar clave secreta',
  ApiParam: {
    name: 'id',
    description: 'ID de la clave a eliminar',
    example: 'ca70ed6c-54c2-00a8-9e1d-1104bd41ee10',
    required: true,
    schema: { type: 'string', format: 'uuid' },
  },
  ApiOkResponse: {
    description: 'Clave eliminada exitosamente',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            statusCode: { type: 'number', example: 200 },
            message: {
              type: 'string',
              example: 'Clave eliminada exitosamente',
            },
            data: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  format: 'uuid',
                  example: 'b3a0ed6c-54c2-4008-9ebd-1104bd41ee10',
                },
                isActive: { type: 'boolean', example: true },
                name: { type: 'string', example: 'My secret key' },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-05-02T15:38:30.029Z',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-05-02T18:00:26.360Z',
                },
              },
            },
          },
        },
        example: {
          success: true,
          statusCode: 200,
          message: 'Clave eliminada exitosamente',
          data: {
            _id: 'b3a0ed6c-54c2-4008-9ebd-1104bd41ee10',
            isActive: true,
            name: 'My secret key',
            secret_key: '8e2a388e24...0a38',
            createdAt: '2025-05-02T15:38:30.029Z',
            updatedAt: '2025-05-02T18:00:26.360Z',
          },
        },
      },
    },
  },
  ApiBadRequestResponse: {
    description: 'ID inválido',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Por favor, proporcione un ID correcto.',
            },
            error: { type: 'string', example: 'Bad Request' },
            statusCode: { type: 'number', example: 400 },
          },
        },
      },
    },
  },
  ApiNotFoundResponse: {
    description: 'Clave no encontrada',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Clave no encontrada',
            },
            error: { type: 'string', example: 'Not Found' },
            statusCode: { type: 'number', example: 404 },
          },
        },
        example: {
          message: 'Clave no encontrada',
          error: 'Not Found',
          statusCode: 404,
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

export function DocumentDeleteSecretKey() {
  return applyDecorators(
    ApiOperation({ summary: DeleteSecretKeySwagger.summary }),
    ApiParam(DeleteSecretKeySwagger.ApiParam),
    ApiOkResponse(DeleteSecretKeySwagger.ApiOkResponse),
    ApiBadRequestResponse(DeleteSecretKeySwagger.ApiBadRequestResponse),
    ApiNotFoundResponse(DeleteSecretKeySwagger.ApiNotFoundResponse),
    ApiForbiddenResponse(DeleteSecretKeySwagger.ApiForbiddenResponse),
    ApiInternalServerErrorResponse(
      DeleteSecretKeySwagger.ApiInternalServerErrorResponse,
    ),
  )
}
