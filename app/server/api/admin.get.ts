import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '../utils/require-admin'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const [users, advertisements] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, role: true, createdAt: true, _count: { select: { advertisements: true } } },
    }),
    prisma.advertisement.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    }),
  ])

  return { users, advertisements }
})