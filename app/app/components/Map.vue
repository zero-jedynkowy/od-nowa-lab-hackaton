<template>
  <div id="map" class="map-container"></div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'

const data_base = defineModel({ default: () => [
  {
    id: 1, 
    name: 'Pin 1', 
    description: 'Description for Pin 1', 
    lat: 52.3477, 
    lng: 21.2464, 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIgC60W2hgcwFvfBw9tRqyMW7cFxKt3ZaVgR3sepdejg&s=10', 
    url: 'https://google.com'
  },
] })

let PinStack = null
let L = null 

const PinRedraw = () => {
  if (!PinStack || !L) return 
  
  PinStack.clearLayers()
  
  data_base.value.forEach((item) => {
    const marker = L.marker([item.lat, item.lng])
    const OutterURL = item.url.startsWith('http')
    const target = OutterURL ? '_blank' : '_self'

    marker.bindPopup(`
      <div style="display: flex; flex-direction: column; gap: 10px; text-align: center; min-width: 200px; font-family: sans-serif;">
        <div style="margin-bottom: 5px;">
          <h3 style="margin: 0 0 5px 0; font-size: 1.4rem; font-weight: bold; color: #2c3e50;">${item.name}</h3>
          <p style="margin: 0; font-size: 0.95rem; color: #666;">${item.description}</p>
        </div>
        
        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 130px; object-fit: cover; border-radius: 8px;">
        
        <a 
          id="btn-id-${item.id}" 
          href="${item.url}" 
          target="${target}"
          class="btn btn-success w-100" 
          style="color: white !important; text-decoration: none; font-weight: bold; padding: 8px 12px; border-radius: 6px; margin-top: 5px; display: block;"
        >
          Details
        </a>
      </div>
    `)

    marker.on('popupopen', () => {
      const link = document.getElementById(`btn-id-${item.id}`)
      if (link && !OutterURL) {
        link.addEventListener('click', (event) => {
          navigateTo(item.url)
        })
      }
    })

    marker.addTo(PinStack)
  })
}

watch(data_base, () => {
  PinRedraw()
}, { deep: true })

onMounted(async () => {
  const { default: leaflet } = await import('leaflet')
  L = leaflet
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