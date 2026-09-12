<template>
  <div id="map" class="map-container"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'

onMounted(async () => {
  const { default: L } = await import('leaflet')
  const map = L.map('map').setView([52.34776982482941, 21.24645714794306], 15)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)
  const marker = L.marker([52.34776982482941, 21.24645714794306]).addTo(map)
  marker.bindPopup("<b>Cześć!</b><br>Tu kodujemy na hackathonie.").openPopup()
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 750px;
  border-radius: 8px;
  border: 2px solid #ccc;
}
</style>