import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger'

const ProtectedSwagger = {
  summary: 'Estado de sesión',
  ApiOkResponse: {
    description: 'Respuesta exitosa con token válido',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          example: {
            succes: true,
            statusCode: 200,
            message: 'Sesión valida',
            data: {
              userId: '550e8400-e29b-41d4-a716-446655440000',
              iat: 1746396093,
              exp: 1746399693,
            },
          },
        },
      },
    },
  },
  ApiUnauthorizedResponse: {
    description: 'Token inválido o no proporcionado',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Unauthorized' },
            error: { type: 'string', example: 'Unauthorized' },
            statusCode: { type: 'number', example: 401 },
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
            message: { type: 'string', example: 'Error interno del servidor.' },
            error: { type: 'string', example: 'Internal Server Error' },
            statusCode: { type: 'number', example: 500 },
          },
        },
      },
    },
  },
}

export function DocumentWithBearerAuth(
  summary: string = ProtectedSwagger.summary,
) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBearerAuth(),
    ApiOkResponse(ProtectedSwagger.ApiOkResponse),
    ApiUnauthorizedResponse(ProtectedSwagger.ApiUnauthorizedResponse),
    ApiInternalServerErrorResponse(
      ProtectedSwagger.ApiInternalServerErrorResponse,
    ),
  )
}
