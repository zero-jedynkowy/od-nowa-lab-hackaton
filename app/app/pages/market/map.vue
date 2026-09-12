<script setup>
const route = useRoute()
const advertisements = ref([])
const isLoading = ref(false)
const loadError = ref('')

const loadAdvertisements = async () => {
  isLoading.value = true
  loadError.value = ''

  try {
    const response = await $fetch('/api/advertisements', {
      query: { limit: 1000, withLocation: true, search: String(route.query.search || '') },
    })
    advertisements.value = response.items
  } catch {
    loadError.value = 'Nie udało się pobrać ogłoszeń na mapie.'
  } finally {
    isLoading.value = false
  }
}

watch(() => route.query.search, loadAdvertisements, { immediate: true })
</script>

<template>
  <div class="market-map-page">
    <p v-if="isLoading" class="text-body-secondary">Ładowanie ogłoszeń na mapie...</p>
    <p v-if="loadError" class="text-danger">{{ loadError }}</p>
    <p v-if="!isLoading && !loadError && !advertisements.length" class="text-body-secondary map-message">Brak ogłoszeń z lokalizacją.</p>
    <Map v-model="advertisements" />
  </div>
</template>

<style scoped>
  main
  {
    max-width: 1024px;
    margin: 0 auto 0 auto;
    padding: 1rem;
    box-sizing: border-box;
  }
</style>

<style>
  .myBtn::before
  {
    margin-right: 5px;
  }
</style>
