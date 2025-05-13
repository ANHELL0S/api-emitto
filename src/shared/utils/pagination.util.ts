import { BadRequestException } from '@nestjs/common'

export const createPaginationObject = (
  page: number,
  limit: number,
  count: number,
) => {
  if (page < 1 || limit < 1)
    throw new BadRequestException(
      'Los parámetros de página y límite deben ser mayores a 0.',
    )

  return {
    query: `page=${page}&limit=${limit}&offset=${(page - 1) * limit}`,
    limit: Number(limit),
    offset: (page - 1) * limit,
    totalRecords: count,
    filteredRecords: 0, // ✅ Corrección aquí
    totalPages: Math.ceil(count / limit),
    currentPage: Number(page),
    hasNextPage: Number(page) * limit < count,
    hasPreviousPage: Number(page) > 1,
    firstPage: 1,
    lastPage: Math.ceil(count / limit),
    nextPage: Number(page) * limit < count ? Number(page) + 1 : null,
    previousPage: Number(page) > 1 ? Number(page) - 1 : null,
    perPage: Number(limit),
  }
}
