import { getServerSession } from '#auth'

export const requireAdmin = async (event) => {
  const session = await getServerSession(event)

  if (session?.user?.role !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: 'Brak uprawnień administratora.' })
  }

  return session
}