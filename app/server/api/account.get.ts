import { getServerSession } from '#auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const userId = session?.user?.id

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Musisz być zalogowany.' })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      advertisements: {
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, category: true, createdAt: true },
      },
    },
  })

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'Nie znaleziono użytkownika.' })
  }

  return user
})