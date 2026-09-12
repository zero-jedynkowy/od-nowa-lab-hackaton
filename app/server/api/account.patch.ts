import { getServerSession } from '#auth'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const userId = session?.user?.id

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Musisz być zalogowany.' })
  }

  const body = await readBody(event)
  const email = typeof body?.email === 'string' ? body.email.trim() : undefined
  const currentPassword = typeof body?.currentPassword === 'string' ? body.currentPassword : ''
  const newPassword = typeof body?.newPassword === 'string' ? body.newPassword : undefined

  if (email === undefined && newPassword === undefined) {
    throw createError({ statusCode: 400, statusMessage: 'Brak danych do zmiany.' })
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user?.password || !currentPassword || !(await bcrypt.compare(currentPassword, user.password))) {
    throw createError({ statusCode: 400, statusMessage: 'Bieżące hasło jest nieprawidłowe.' })
  }

  const data: { email?: string; password?: string } = {}

  if (email !== undefined) {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw createError({ statusCode: 400, statusMessage: 'Podaj poprawny adres e-mail.' })
    }

    const existingUser = await prisma.user.findFirst({ where: { email, NOT: { id: userId } } })
    if (existingUser) {
      throw createError({ statusCode: 409, statusMessage: 'Taki e-mail już istnieje.' })
    }
    data.email = email
  }

  if (newPassword !== undefined) {
    if (newPassword.length < 8) {
      throw createError({ statusCode: 400, statusMessage: 'Nowe hasło musi mieć co najmniej 8 znaków.' })
    }
    data.password = await bcrypt.hash(newPassword, 10)
  }

  await prisma.user.update({ where: { id: userId }, data })

  return { message: 'Dane konta zostały zmienione.' }
})