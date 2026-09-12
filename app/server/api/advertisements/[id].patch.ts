import { getServerSession } from '#auth'
import { PrismaClient } from '@prisma/client'
import { isWolominCoordinates } from '../../utils/wolomin-location'
import { unlink, mkdir, writeFile } from 'node:fs/promises'
import { extname, join, basename, resolve } from 'node:path'
import { randomUUID } from 'node:crypto'

const prisma = new PrismaClient()
const MAX_FIELD_LENGTH = 1024
const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

const saveImage = async (part: { data: Buffer; filename?: string; type?: string }) => {
  if (!part.filename || !part.type || !allowedImageTypes.has(part.type) || part.data.length > MAX_IMAGE_SIZE) {
    throw createError({ statusCode: 400, statusMessage: 'Nieprawidłowy plik graficzny. Maksymalny rozmiar to 5 MB.' })
  }

  const filename = `${randomUUID()}${extname(part.filename).toLowerCase() || '.jpg'}`
  const uploadDirectory = resolve(process.cwd(), process.env.UPLOADS_PATH || './public/uploads')
  await mkdir(uploadDirectory, { recursive: true })
  await writeFile(join(uploadDirectory, filename), part.data)
  return `/uploads/${filename}`
}

const removeImage = async (imagePath) => {
  if (!imagePath?.startsWith('/uploads/')) return
  await unlink(join(resolve(process.cwd(), process.env.UPLOADS_PATH || './public/uploads'), basename(imagePath))).catch(() => undefined)
}

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

  const parts = await readMultipartFormData(event)
  const fields = new Map<string, string>()
  const images: Array<{ data: Buffer; filename?: string; type?: string }> = []
  let logoPart
  let bannerPart
  for (const part of parts || []) {
    if (part.name === 'images' && part.filename) images.push(part)
    else if (part.name === 'logo' && part.filename) logoPart = part
    else if (part.name === 'banner' && part.filename) bannerPart = part
    else if (part.name && !part.filename) fields.set(part.name, part.data.toString())
  }

  if (images.length > 10) {
    throw createError({ statusCode: 400, statusMessage: 'Możesz dodać maksymalnie 10 zdjęć.' })
  }

  const name = fields.get('name')?.trim() || ''
  const description = fields.get('description')?.trim() || ''
  const category = fields.get('category')?.trim() || ''
  const phone = fields.get('phone')?.trim() || ''
  const email = fields.get('email')?.trim() || ''
  const address = fields.get('address')?.trim() || ''
  const latitude = Number(fields.get('latitude'))
  const longitude = Number(fields.get('longitude'))
  const removeLogo = fields.get('removeLogo') === 'true'
  const removeBanner = fields.get('removeBanner') === 'true'
  const replaceImages = fields.get('replaceImages') === 'true'
  const sociale = {
    fb: fields.get('sociale.fb') || '',
    ig: fields.get('sociale.ig') || '',
    x: fields.get('sociale.x') || '',
  }

  if (!name || !description || !category || !phone || !email || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw createError({ statusCode: 400, statusMessage: 'Wypełnij wszystkie wymagane pola oraz wybierz lokalizację.' })
  }

  const values = [name, description, category, phone, email, address, ...Object.values(sociale)]
  if (values.some((value) => value.length > MAX_FIELD_LENGTH)) {
    throw createError({ statusCode: 400, statusMessage: 'Każde pole może mieć maksymalnie 1024 znaki.' })
  }

  if (!isWolominCoordinates(latitude, longitude)) {
    throw createError({ statusCode: 400, statusMessage: 'Lokalizacja ogłoszenia musi znajdować się w Wołominie.' })
  }

  const logo = removeLogo ? null : logoPart ? await saveImage(logoPart) : undefined
  const banner = removeBanner ? null : bannerPart ? await saveImage(bannerPart) : undefined
  const savedImages = replaceImages ? await Promise.all(images.map(saveImage)) : undefined

  const updatedAdvertisement = await prisma.advertisement.update({
    where: { id: advertisement.id },
    data: {
      name, description, category, phone, email, address: address || null, latitude, longitude, sociale,
      logo, banner, images: savedImages,
    },
  })

  if (removeLogo || logoPart) await removeImage(advertisement.logo)
  if (removeBanner || bannerPart) await removeImage(advertisement.banner)
  if (replaceImages && Array.isArray(advertisement.images)) {
    await Promise.all(advertisement.images.map((image) => removeImage(image)))
  }

  return { advertisement: updatedAdvertisement }
})