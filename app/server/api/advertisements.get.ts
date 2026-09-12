import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Math.max(Number.parseInt(String(query.page || '1'), 10) || 1, 1)
  const limit = Math.min(Math.max(Number.parseInt(String(query.limit || '10'), 10) || 10, 1), 20)
  const search = typeof query.search === 'string' ? query.search.trim() : ''

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
          { category: { contains: search, mode: 'insensitive' as const } },
        ],
      }
    : undefined

  const [items, total] = await Promise.all([
    prisma.advertisement.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.advertisement.count({ where }),
  ])

  return {
    items,
    page,
    limit,
    total,
    hasMore: page * limit < total,
  }
})