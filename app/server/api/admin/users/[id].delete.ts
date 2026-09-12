import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '../../../utils/require-admin'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const session = await requireAdmin(event)
  const id = getRouterParam(event, 'id')

  if (session.user.id === id) {
    throw createError({ statusCode: 400, statusMessage: 'Nie możesz usunąć własnego konta.' })
  }

  const user = await prisma.user.findUnique({ where: { id }, select: { id: true } })
  if (!user) throw createError({ statusCode: 404, statusMessage: 'Użytkownik nie istnieje.' })

  await prisma.user.delete({ where: { id } })
  return { message: 'Użytkownik został usunięty.' }
})