import { applyDecorators } from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

const SigninSwagger = {
  summary: 'Iniciar sesión',
  ApiBody: {
    description: 'Credenciales de inicio de sesión',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'aangelogarcia2021@gmail.com',
        },
        password: {
          type: 'string',
          example: 'aangelogarcia2021@gmail.com',
        },
      },
      required: ['email', 'password'],
    },
  },
  ApiOkResponse: {
    description: 'Inicio de sesión exitoso',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
              example: {
                success: true,
                statusCode: 200,
                message: 'Sesión iniciada exitosamente',
                data: {
                  accessToken:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAiLCJpYXQiOjE3NDYzOTYwOTMsImV4cCI6MTc0NjM5OTY5M30.r9LF-TUyc-e6lP48Mttflx6rEOC0qDoVY6YI33xNv50',
                  expiresIn: 3600,
                },
              },
            },
          },
        },
      },
    },
  },
  ApiUnauthorizedResponse: {
    description: 'Credenciales inválidas',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
              example: {
                message: 'Credenciales inválidas',
                error: 'Unauthorized',
                statusCode: 401,
              },
            },
          },
        },
      },
    },
  },
  ApiBadRequestResponse: {
    description: 'Credenciales inválidas o formato incorrecto',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'array',
              items: { type: 'string' },
              example: ['El email es obligatorio.', 'Contraseña inválida.'],
            },
            error: { type: 'string', example: 'Bad Request' },
            statusCode: { type: 'number', example: 400 },
          },
        },
      },
    },
  },
  ApiInternalServerErrorResponse: {
    description: 'Error inesperado del servidor',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Error interno del servidor.',
            },
            error: { type: 'string', example: 'Internal Server Error' },
            statusCode: { type: 'number', example: 500 },
          },
        },
      },
    },
  },
}

export function DocumentSigninUser() {
  return applyDecorators(
    ApiOperation({ summary: SigninSwagger.summary }),
    ApiBody(SigninSwagger.ApiBody),
    ApiOkResponse(SigninSwagger.ApiOkResponse),
    ApiBadRequestResponse(SigninSwagger.ApiBadRequestResponse),
    ApiUnauthorizedResponse(SigninSwagger.ApiUnauthorizedResponse),
    ApiInternalServerErrorResponse(
      SigninSwagger.ApiInternalServerErrorResponse,
    ),
  )
}
