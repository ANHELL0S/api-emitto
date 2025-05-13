import { HttpException } from '@nestjs/common'

export class ErrorHandler {
  static handle(error: any) {
    if (error instanceof HttpException) {
      const response = error.getResponse() // Obtener la respuesta del error

      // Comprobar si la respuesta es un objeto y tiene la propiedad 'message'
      if (typeof response === 'object' && response !== null) {
        // Acceder de forma segura al mensaje
        const message = (response as { message?: string }).message
        return {
          success: false,
          statusCode: error.getStatus(),
          message: message || 'Ocurrió un error inesperado',
        }
      }

      // Si la respuesta no es un objeto o no tiene el mensaje esperado
      return {
        success: false,
        statusCode: error.getStatus(),
        message: response || 'Ocurrió un error inesperado',
      }
    }

    // En caso de que no sea un HttpException, devolvemos un error genérico
    return {
      success: false,
      statusCode: 500,
      message: 'Lo sentimos, algo salió mal. Por favor, intenta más tarde.',
    }
  }
}
