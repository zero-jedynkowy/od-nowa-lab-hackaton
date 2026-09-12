import { isWolominCoordinates } from '../../utils/wolomin-location'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const latitude = Number(query.lat)
  const longitude = Number(query.lon)

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw createError({ statusCode: 400, statusMessage: 'Nieprawidłowe współrzędne.' })
  }

  if (!isWolominCoordinates(latitude, longitude)) {
    throw createError({ statusCode: 400, statusMessage: 'Lokalizacja musi znajdować się w Wołominie.' })
  }

  const response = await $fetch<{ display_name?: string }>(
    'https://nominatim.openstreetmap.org/reverse',
    {
      query: { lat: latitude, lon: longitude, format: 'jsonv2', 'accept-language': 'pl' },
      headers: {
        Accept: 'application/json',
        'User-Agent': 'WolominLocalMarketplace/1.0',
      },
    },
  )

  return { address: response.display_name || '' }
})