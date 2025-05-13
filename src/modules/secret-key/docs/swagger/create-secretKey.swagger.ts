import { applyDecorators } from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger'

const CreateSecretKeySwagger = {
  summary: 'Crear clave',
  ApiBody: {
    description: 'User creation payload',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Clave de prueba' },
      },
      required: ['name'],
    },
  },
  ApiCreatedResponse: {
    description: 'Clave creada exitosamente',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            statusCode: { type: 'number', example: 201 },
            message: {
              type: 'string',
              example: 'Clave creada exitosamente',
            },
            data: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  format: 'uuid',
                  example: 'afa83bd8-f9b3-4779-bce7-0ceeb522ed7b',
                },
                isActive: { type: 'boolean', example: true },
                name: { type: 'string', example: 'Clave de prueba' },
                secret_key: {
                  type: 'string',
                  format: 'text',
                  example: '8e2a388e24...0a38',
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-05-02T18:52:54.091Z',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-05-02T18:52:54.091Z',
                },
              },
            },
          },
        },
        example: {
          success: true,
          statusCode: 201,
          message: 'Clave creada exitosamente',
          data: {
            _id: 'afa83bd8-f9b3-4779-bce7-0ceeb522ed7b',
            isActive: true,
            name: 'Clave de prueba',
            secret_key: '8e2a388e24...0a38',
            createdAt: '2025-05-02T18:52:54.091Z',
            updatedAt: '2025-05-02T18:52:54.091Z',
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
              example: ['El campo name es obligatorio.'],
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

export function DocumentCreateSecretKey() {
  return applyDecorators(
    ApiOperation({ summary: CreateSecretKeySwagger.summary }),
    ApiBody(CreateSecretKeySwagger.ApiBody),
    ApiCreatedResponse(CreateSecretKeySwagger.ApiCreatedResponse),
    ApiBadRequestResponse(CreateSecretKeySwagger.ApiBadRequestResponse),
    ApiForbiddenResponse(CreateSecretKeySwagger.ApiForbiddenResponse),
    ApiInternalServerErrorResponse(
      CreateSecretKeySwagger.ApiInternalServerErrorResponse,
    ),
  )
}
