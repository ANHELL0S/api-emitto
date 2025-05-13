import { Op, WhereOptions } from 'sequelize'

export const createFilter = (
  search: string,
  searchFields: string[],
): WhereOptions => {
  if (search && search.trim() !== '') {
    const filters = searchFields.map((field) => ({
      [field]: {
        [Op.iLike]: `%${search.trim()}%`,
      },
    }))
    return {
      [Op.or]: filters,
    }
  }

  return {}
}
