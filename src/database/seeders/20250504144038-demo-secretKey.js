'use strict'

import { v4 as uuidv4 } from 'uuid'
import { randomBytes } from 'crypto'

export async function up(queryInterface, Sequelize) {
  const now = new Date()
  const records = []

  records.push({
    _id: uuidv4(),
    name: `Clave para pruebas`,
    secret_key: randomBytes(32).toString('hex'),
    isActive: true,
    createdAt: now,
    updatedAt: now,
  })

  await queryInterface.bulkInsert('secret_key', records, {})
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('secret_key', null, {})
}
