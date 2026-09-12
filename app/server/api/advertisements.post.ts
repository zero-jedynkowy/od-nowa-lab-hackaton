import { getServerSession } from '#auth'
import { PrismaClient } from '@prisma/client'
import { mkdir, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { randomUUID } from 'node:crypto'

const prisma = new PrismaClient()
const MAX_FIELD_LENGTH = 1024
const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

const saveImage = async (part: { data: Buffer; filename?: string; type?: string }) => {
  if (!part.filename || !part.type || !allowedImageTypes.has(part.type) || part.data.length > MAX_IMAGE_SIZE) {
    throw createError({ statusCode: 400, statusMessage: 'Nieprawidłowy plik graficzny. Maksymalny rozmiar to 5 MB.' })
  }

  const extension = extname(part.filename).toLowerCase() || '.jpg'
  const filename = `${randomUUID()}${extension}`
  const uploadDirectory = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDirectory, { recursive: true })
  await writeFile(join(uploadDirectory, filename), part.data)
  return `/uploads/${filename}`
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const userId = session?.user?.id

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Musisz być zalogowany, aby dodać ogłoszenie.' })
  }

  const parts = await readMultipartFormData(event)
  const formFields = new Map<string, string>()
  const images: Array<{ data: Buffer; filename?: string; type?: string }> = []
  let logoPart
  let bannerPart

  for (const part of parts || []) {
    if (part.name === 'images' && part.filename) images.push(part)
    else if (part.name === 'logo' && part.filename) logoPart = part
    else if (part.name === 'banner' && part.filename) bannerPart = part
    else if (part.name && !part.filename) formFields.set(part.name, part.data.toString())
  }

  if (images.length > 10) {
    throw createError({ statusCode: 400, statusMessage: 'Możesz dodać maksymalnie 10 zdjęć.' })
  }

  const name = formFields.get('name')?.trim() || ''
  const description = formFields.get('description')?.trim() || ''
  const category = formFields.get('category')?.trim() || ''
  const phone = formFields.get('phone')?.trim() || ''
  const email = formFields.get('email')?.trim() || ''
  const sociale = {
    fb: formFields.get('sociale.fb') || '',
    ig: formFields.get('sociale.ig') || '',
    x: formFields.get('sociale.x') || '',
  }
  const socialValues = Object.values(sociale)

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

  const logo = logoPart ? await saveImage(logoPart) : null
  const banner = bannerPart ? await saveImage(bannerPart) : null
  const savedImages = await Promise.all(images.map(saveImage))

  const advertisement = await prisma.advertisement.create({
    data: { name, description, category, phone, email, sociale, logo, banner, images: savedImages, userId },
  })

  return { advertisement }
})