export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const address = typeof query.q === 'string' ? query.q.trim() : ''

  if (!address) {
    return []
  }

  const response = await $fetch<Array<{ display_name: string; lat: string; lon: string }>>(
    'https://nominatim.openstreetmap.org/search',
    {
      query: {
        q: address,
        format: 'jsonv2',
        limit: 5,
        countrycodes: 'pl',
        viewbox: '21.15,52.40,21.35,52.29',
        bounded: 1,
        'accept-language': 'pl',
      },
      headers: {
        Accept: 'application/json',
        'User-Agent': 'WolominLocalMarketplace/1.0',
      },
    },
  )

  return response.map((item) => ({
    address: item.display_name,
    latitude: Number(item.lat),
    longitude: Number(item.lon),
  }))
})