import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '../../../utils/require-admin'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id')

  const advertisement = await prisma.advertisement.findUnique({ where: { id }, select: { id: true } })
  if (!advertisement) throw createError({ statusCode: 404, statusMessage: 'Ogłoszenie nie istnieje.' })

  await prisma.advertisement.delete({ where: { id } })
  return { message: 'Ogłoszenie zostało usunięte.' }
})