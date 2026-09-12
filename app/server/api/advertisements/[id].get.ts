import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const advertisement = await prisma.advertisement.findUnique({
    where: { id },
    include: { user: { select: { name: true, email: true } } },
  })

  if (!advertisement) {
    throw createError({ statusCode: 404, statusMessage: 'Ogłoszenie nie istnieje.' })
  }

  return advertisement
})