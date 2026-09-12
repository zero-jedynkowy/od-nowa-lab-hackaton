<script setup>
import 'leaflet/dist/leaflet.css'

const advertisements = defineModel({ default: () => [] })
const mapElement = ref(null)
let map
let leaflet
let markerLayer

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

const redrawMarkers = () => {
  if (!markerLayer || !leaflet) return

  markerLayer.clearLayers()
  const visibleAdvertisements = advertisements.value.filter((item) => (
    Number.isFinite(Number(item.latitude)) && Number.isFinite(Number(item.longitude))
  ))

  visibleAdvertisements.forEach((item) => {
    const latitude = Number(item.latitude)
    const longitude = Number(item.longitude)
    const marker = leaflet.marker([latitude, longitude])
    const title = escapeHtml(item.name)
    const category = escapeHtml(item.category)
    const address = escapeHtml(item.address || 'Brak adresu')

    marker.bindPopup(`
      <div class="map-popup">
        <strong>${title}</strong>
        <span>Kategoria: ${category}</span>
        <span>${address}</span>
        <a href="/market/${encodeURIComponent(item.id)}" class="btn btn-success btn-sm">Szczegóły</a>
      </div>
    `)
    marker.addTo(markerLayer)
  })

  if (visibleAdvertisements.length === 1) {
    map.setView([Number(visibleAdvertisements[0].latitude), Number(visibleAdvertisements[0].longitude)], 16)
  } else if (visibleAdvertisements.length > 1) {
    map.fitBounds(visibleAdvertisements.map((item) => [Number(item.latitude), Number(item.longitude)]), { padding: [30, 30] })
  }
}

watch(advertisements, redrawMarkers, { deep: true })

onMounted(async () => {
  const imported = await import('leaflet')
  leaflet = imported.default
  map = leaflet.map(mapElement.value).setView([52.3477, 21.2464], 13)
  leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)
  markerLayer = leaflet.layerGroup().addTo(map)
  redrawMarkers()
})

onBeforeUnmount(() => map?.remove())
</script>

<template>
  <div ref="mapElement" class="map-container"></div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 70vh;
  min-height: 480px;
  margin: 0;
}

:deep(.map-popup) {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 190px;
}
</style>
