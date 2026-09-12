<template>
  <div id="map" class="map-container"></div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'

const data_base = ref([
  {
    id: 1, 
    name: 'Baza Główna', 
    lat: 52.3490, 
    lng: 21.2464, 
    description: 'Tu kodujemy!', 
    image: 'https://via.placeholder.com/150'
  }
])

let map = null
let L = null
let warstwaPinezek = null

const dodajPinezke = (nazwa, lat, lng, opis, zdjecie) => {
  data_base.value.push({
    id: Date.now(),
    name: nazwa,
    lat: lat,
    lng: lng,
    description: opis,
    image: zdjecie || 'https://via.placeholder.com/150'
  })
}

const rysujPinezki = () => {
  if (!warstwaPinezek) return
  
  warstwaPinezek.clearLayers()

  data_base.value.forEach((item) => {
    const marker = L.marker([item.lat, item.lng])
    marker.bindPopup(`
      <h3 style="margin: 0 0 5px 0;">${item.name}</h3>
      <p style="margin: 0 0 10px 0;">${item.description}</p>
      <img src="${item.image}" alt="${item.name}" style="max-width: 100%; border-radius: 4px;">
    `)
    marker.addTo(warstwaPinezek)
  })
}

watch(data_base, () => {
  rysujPinezki()
}, { deep: true })

onMounted(async () => {
  const { default: leaflet } = await import('leaflet')
  L = leaflet
  
  map = L.map('map').setView([52.3477, 21.2464], 14)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map)
  
  warstwaPinezek = L.layerGroup().addTo(map)
  rysujPinezki()
  setTimeout(() => {
    dodajPinezke(
      "Zrzut zaopatrzenia", 
      52.3520, 
      21.2500, 
      "Paczka dotarła na miejsce!", 
      "https://via.placeholder.com/150/FF0000/FFFFFF?text=Zrzut"
    )
  }, 5000)
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh; 
  margin: 0;
  padding: 0;
}
</style>