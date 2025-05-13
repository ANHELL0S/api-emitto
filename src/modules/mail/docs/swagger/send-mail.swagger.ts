import { applyDecorators } from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiHeader,
} from '@nestjs/swagger'

const SendMailSwagger = {
  summary: 'Enviar correo electrónico',
  ApiBody: {
    description: 'Payload para enviar un correo electrónico',
    schema: {
      type: 'object',
      properties: {
        from: { type: 'string', example: 'noreply@example.com' },
        subjectEmail: { type: 'string', example: 'Asunto del correo' },
        sendTo: {
          type: 'array',
          items: { type: 'string', format: 'email' },
          example: ['destinatario1@example.com', 'destinatario2@example.com'],
        },
        message: {
          type: 'string',
          example: '<p>Contenido HTML del correo</p>',
        },
        attachments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              filename: { type: 'string', example: 'documento.pdf' },
              path: { type: 'string', example: '/ruta/documento.pdf' },
            },
          },
        },
      },
      required: ['from', 'subjectEmail', 'sendTo', 'message'],
    },
  },
  ApiCreatedResponse: {
    description: 'Correo enviado correctamente',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            statusCode: { type: 'number', example: 201 },
            message: {
              type: 'string',
              example: 'Correo enviado correctamente',
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
            },
            error: { type: 'string', example: 'Bad Request' },
            statusCode: { type: 'number', example: 400 },
          },
        },
      },
    },
  },
  ApiForbiddenResponse: {
    description:
      'No se encontró o es inválido el header personalizado "x-key-emitto"',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Encabezado "x-key-emitto" ausente o inválido.',
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

export function DocumentSendMail() {
  return applyDecorators(
    ApiOperation({ summary: SendMailSwagger.summary }),
    ApiHeader({
      name: 'x-key-emitto',
      description: 'Clave secreta necesaria para autorización',
      required: true,
      example: 'your-secret-key-123',
    }),
    ApiBody(SendMailSwagger.ApiBody),
    ApiCreatedResponse(SendMailSwagger.ApiCreatedResponse),
    ApiBadRequestResponse(SendMailSwagger.ApiBadRequestResponse),
    ApiForbiddenResponse(SendMailSwagger.ApiForbiddenResponse),
    ApiInternalServerErrorResponse(
      SendMailSwagger.ApiInternalServerErrorResponse,
    ),
  )
}
