import { BadRequestException } from '@nestjs/common'

export const createSortingObject = (
  orderBy: string = 'createdAt', // Valor por defecto si no se pasa
  sortOrder: 'ASC' | 'DESC' = 'ASC', // Valor por defecto si no se pasa
  sortableFields: string[], // Campos que se pueden ordenar
) => {
  // Si el valor de `orderBy` no es válido o no está en los campos permitidos, lanza un error
  if (!sortableFields.includes(orderBy)) {
    throw new BadRequestException(
      `El campo '${orderBy}' no es un campo válido para ordenar.`,
    )
  }

  return {
    sortableFields,
    query: `${orderBy},${sortOrder}`,
    sort: [
      {
        field: orderBy,
        order: sortOrder,
      },
    ],
  }
}
