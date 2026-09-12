<template>
  <div id="map" class="map-container"></div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'

const data_base = defineModel({ default: () => [
  {id: 1, name: 'Pin 1', description: 'Description for Pin 1', lat: 52.3477, lng: 21.2464, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIgC60W2hgcwFvfBw9tRqyMW7cFxKt3ZaVgR3sepdejg&s=10'},
] })
let PinStack = null
const PinRedraw = () => {
  if (!PinStack) return
  PinStack.clearLayers()
  data_base.value.forEach((item) => {
    const marker = L.marker([item.lat, item.lng])
    marker.bindPopup(`
      <h3 style="margin: 0 0 5px 0;">${item.name}</h3>
      <p style="margin: 0 0 10px 0;">${item.description}</p>
      <img src="${item.image}" alt="${item.name}" style="max-width: 100%; height: auto;">
    `)
    marker.addTo(PinStack)
  })
}

watch(data_base, () => {
  PinRedraw()
}, { deep: true })

onMounted(async () => {
  const { default: L } = await import('leaflet')
  const map = L.map('map').setView([52.3477, 21.2464], 14)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
  
  PinStack = L.layerGroup().addTo(map)
  PinRedraw()
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh; 
  margin: 0;
}
</style>