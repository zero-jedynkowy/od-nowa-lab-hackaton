<script setup>
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  address: { type: String, default: '' },
})

const mapElement = ref(null)
let map

onMounted(async () => {
  const { default: leaflet } = await import('leaflet')
  const position = [props.latitude, props.longitude]

  map = leaflet.map(mapElement.value, { scrollWheelZoom: false }).setView(position, 16)
  leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  const marker = leaflet.marker(position).addTo(map)
  if (props.address) marker.bindPopup(props.address).openPopup()
})

onBeforeUnmount(() => map?.remove())
</script>

<template>
  <div ref="mapElement" class="location-preview"></div>
</template>

<style scoped>
.location-preview {
  width: 100%;
  height: 360px;
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>