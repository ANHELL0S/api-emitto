'use strict'

import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

export async function up(queryInterface) {
  const saltRounds = 10
  const now = new Date()
  const users = []

  const adminPassword = await hash('Shouko2021@@', saltRounds)
  users.push({
    _id: uuidv4(),
    name: 'Admin User',
    email: 'aangelogarcia2021@gmail.com',
    password: adminPassword,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  })

  return queryInterface.bulkInsert('users', users)
}

export async function down(queryInterface) {
  return queryInterface.bulkDelete('users', null, {})
}
