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

const DeleteUserSwagger = {
  summary: 'Eliminar un usuario',
  ApiParam: {
    name: 'id',
    description: 'ID del usuario a eliminar',
    example: 'b3a0ed6c-54c2-4008-9ebd-1104bd41ee10',
    required: true,
    schema: { type: 'string', format: 'uuid' },
  },
  ApiOkResponse: {
    description: 'Usuario eliminado exitosamente',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            statusCode: { type: 'number', example: 200 },
            message: {
              type: 'string',
              example: 'Usuario eliminado exitosamente',
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
                name: { type: 'string', example: 'Angelo Garcia' },
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'aangelogarcia2021@gmail.com',
                },
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
          message: 'Usuario eliminado exitosamente',
          data: {
            _id: 'b3a0ed6c-54c2-4008-9ebd-1104bd41ee10',
            isActive: true,
            name: 'Angelo Garcia',
            email: 'aangelogarcia2021@gmail.com',
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
    description: 'Usuario no encontrado',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Usuario no encontrado',
            },
            error: { type: 'string', example: 'Not Found' },
            statusCode: { type: 'number', example: 404 },
          },
        },
        example: {
          message: 'Usuario no encontrado',
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

export function DocumentDeleteUser() {
  return applyDecorators(
    ApiOperation({ summary: DeleteUserSwagger.summary }),
    ApiParam(DeleteUserSwagger.ApiParam),
    ApiOkResponse(DeleteUserSwagger.ApiOkResponse),
    ApiBadRequestResponse(DeleteUserSwagger.ApiBadRequestResponse),
    ApiNotFoundResponse(DeleteUserSwagger.ApiNotFoundResponse),
    ApiForbiddenResponse(DeleteUserSwagger.ApiForbiddenResponse),
    ApiInternalServerErrorResponse(
      DeleteUserSwagger.ApiInternalServerErrorResponse,
    ),
  )
}
