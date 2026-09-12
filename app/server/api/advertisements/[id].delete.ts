import { getServerSession } from '#auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const userId = session?.user?.id
  const id = getRouterParam(event, 'id')

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Musisz być zalogowany.' })
  }

  const advertisement = await prisma.advertisement.findFirst({ where: { id, userId } })
  if (!advertisement) {
    throw createError({ statusCode: 404, statusMessage: 'Nie znaleziono ogłoszenia.' })
  }

  await prisma.advertisement.delete({ where: { id: advertisement.id } })
  return { message: 'Ogłoszenie zostało usunięte.' }
})