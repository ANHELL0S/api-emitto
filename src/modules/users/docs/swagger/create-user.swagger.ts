import { applyDecorators } from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger'

const CreateUserSwagger = {
  summary: 'Crear usuario',
  ApiBody: {
    description: 'User creation payload',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        email: {
          type: 'string',
          format: 'email',
          example: 'john.doe@example.com',
        },
        password: { type: 'string', example: 'password123' },
      },
      required: ['name', 'email', 'password'],
    },
  },
  ApiCreatedResponse: {
    description: 'Usuario creado correctamente',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            statusCode: { type: 'number', example: 201 },
            message: {
              type: 'string',
              example: 'Usuario creado correctamente',
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
                name: { type: 'string', example: 'Angelo García' },
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'aangelogarcia2021@gmail.com',
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
          message: 'Usuario creado correctamente',
          data: {
            _id: 'afa83bd8-f9b3-4779-bce7-0ceeb522ed7b',
            isActive: true,
            name: 'Angelo García',
            email: 'aangelogarcia2021@gmail.com',
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
              example: [
                'El campo name es obligatorio.',
                'El campo email debe ser un correo válido.',
                'El campo password debe tener al menos 8 caracteres.',
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

export function DocumentCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: CreateUserSwagger.summary }),
    ApiBody(CreateUserSwagger.ApiBody),
    ApiCreatedResponse(CreateUserSwagger.ApiCreatedResponse),
    ApiBadRequestResponse(CreateUserSwagger.ApiBadRequestResponse),
    ApiForbiddenResponse(CreateUserSwagger.ApiForbiddenResponse),
    ApiInternalServerErrorResponse(
      CreateUserSwagger.ApiInternalServerErrorResponse,
    ),
  )
}
