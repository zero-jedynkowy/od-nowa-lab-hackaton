import { getServerSession } from '#auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const MAX_FIELD_LENGTH = 1024

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const userId = session?.user?.id

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Musisz być zalogowany, aby dodać ogłoszenie.' })
  }

  const body = await readBody(event)
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const description = typeof body?.description === 'string' ? body.description.trim() : ''
  const category = typeof body?.category === 'string' ? body.category.trim() : ''
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const sociale = body?.sociale && typeof body.sociale === 'object' ? body.sociale : {}
  const socialValues = ['fb', 'ig', 'x'].map((key) => sociale[key])

  if (!name || !description || !category || !phone || !email) {
    throw createError({ statusCode: 400, statusMessage: 'Wypełnij wszystkie wymagane pola ogłoszenia.' })
  }

  const fields = [name, description, category, phone, email, ...socialValues]
  if (fields.some((value) => value !== undefined && typeof value !== 'string')) {
    throw createError({ statusCode: 400, statusMessage: 'Nieprawidłowe dane ogłoszenia.' })
  }

  if (fields.some((value) => typeof value === 'string' && value.length > MAX_FIELD_LENGTH)) {
    throw createError({ statusCode: 400, statusMessage: 'Każde pole może mieć maksymalnie 1024 znaki.' })
  }

  const advertisement = await prisma.advertisement.create({
    data: { name, description, category, phone, email, sociale, userId },
  })

  return { advertisement }
})