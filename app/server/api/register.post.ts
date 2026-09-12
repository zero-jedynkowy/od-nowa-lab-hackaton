import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, email, password } = body

  if (!username || !email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Brak nazwy użytkownika, emaila lub hasła' })
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    throw createError({ statusCode: 400, statusMessage: 'Taki email już istnieje' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword
    }
  })

  return { message: 'Konto utworzone!' }
})