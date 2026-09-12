<script setup>
import 'leaflet/dist/leaflet.css'

const location = defineModel({
  type: Object,
  default: () => ({ address: '', latitude: null, longitude: null }),
})

const mapElement = ref(null)
const isResolving = ref(false)
const isSearching = ref(false)
const addressQuery = ref(location.value.address || '')
const searchResults = ref([])
const errorMessage = ref('')
let map
let marker
let leaflet

const resolveAddress = async (latitude, longitude) => {
  isResolving.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch('/api/geocode/reverse', {
      query: { lat: latitude, lon: longitude },
    })
    location.value = {
      address: response.address || '',
      latitude,
      longitude,
    }
    addressQuery.value = response.address || ''
  } catch {
    errorMessage.value = 'Nie udało się pobrać adresu dla wybranej lokalizacji.'
    location.value = { ...location.value, latitude, longitude }
  } finally {
    isResolving.value = false
  }
}

const selectLocation = async (point) => {
  marker?.setLatLng(point)
  map?.setView(point)
  await resolveAddress(point.lat, point.lng)
}

const searchAddress = async () => {
  const query = addressQuery.value.trim()
  if (!query) return

  isSearching.value = true
  errorMessage.value = ''
  searchResults.value = []

  try {
    searchResults.value = await $fetch('/api/geocode', { query: { q: query } })
    if (!searchResults.value.length) {
      errorMessage.value = 'Nie znaleziono tego adresu. Spróbuj wpisać ulicę i miasto.'
    }
  } catch {
    errorMessage.value = 'Nie udało się wyszukać adresu.'
  } finally {
    isSearching.value = false
  }
}

const chooseSearchResult = (result) => {
  location.value = result
  searchResults.value = []
  addressQuery.value = result.address
  marker?.setLatLng([result.latitude, result.longitude])
  map?.setView([result.latitude, result.longitude], 17)
}

const locateUser = () => {
  if (!navigator.geolocation) {
    errorMessage.value = 'Ta przeglądarka nie udostępnia geolokalizacji.'
    return
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => selectLocation({ lat: coords.latitude, lng: coords.longitude }),
    () => { errorMessage.value = 'Nie udało się pobrać bieżącej lokalizacji.' },
  )
}

onMounted(async () => {
  const imported = await import('leaflet')
  leaflet = imported.default
  map = leaflet.map(mapElement.value).setView(
    [location.value.latitude || 52.3477, location.value.longitude || 21.2464],
    location.value.latitude ? 16 : 13,
  )
  leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)
  marker = leaflet.marker(map.getCenter(), { draggable: true }).addTo(map)
  map.on('click', selectLocation)
  marker.on('dragend', () => selectLocation(marker.getLatLng()))

  if (location.value.latitude && location.value.longitude) {
    marker.setLatLng([location.value.latitude, location.value.longitude])
  }
})

onBeforeUnmount(() => map?.remove())
</script>

<template>
  <div>
    <label for="location-search" class="form-label">Wyszukaj adres</label>
    <div class="input-group mb-2">
      <input
        id="location-search"
        v-model="addressQuery"
        type="search"
        class="form-control"
        placeholder="np. Kościuszki 1, Wołomin"
        @keyup.enter="searchAddress"
      >
      <button type="button" class="btn btn-outline-secondary" :disabled="isSearching" @click="searchAddress">
        {{ isSearching ? 'Szukam...' : 'Szukaj' }}
      </button>
    </div>
    <div v-if="searchResults.length" class="list-group mb-2">
      <button
        v-for="result in searchResults"
        :key="`${result.latitude}-${result.longitude}`"
        type="button"
        class="list-group-item list-group-item-action text-start"
        @click="chooseSearchResult(result)"
      >
        {{ result.address }}
      </button>
    </div>
    <div ref="mapElement" class="location-map"></div>
    <div class="d-flex gap-2 mt-2">
      <button type="button" class="btn btn-outline-primary" @click="locateUser">Użyj mojej lokalizacji</button>
      <span v-if="isResolving" class="align-self-center text-body-secondary">Pobieranie adresu...</span>
    </div>
    <p v-if="location.address" class="mt-2 mb-1"><strong>Wybrany adres:</strong> {{ location.address }}</p>
    <p v-if="errorMessage" class="text-danger mb-0">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.location-map {
  width: 100%;
  height: 320px;
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>