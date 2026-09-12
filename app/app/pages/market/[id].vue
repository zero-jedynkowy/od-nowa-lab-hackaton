<script setup>
const route = useRoute()
const { data: advertisement, error } = await useFetch(`/api/advertisements/${route.params.id}`)

if (error.value) {
  throw createError({ statusCode: error.value.statusCode || 404, statusMessage: error.value.statusMessage || 'Nie znaleziono ogłoszenia.' })
}

const images = computed(() => Array.isArray(advertisement.value?.images) ? advertisement.value.images : [])
</script>

<template>
  <article v-if="advertisement" class="advertisement-details">
    <NuxtLink to="/market/listings" class="btn btn-outline-secondary mb-3">Wróć do ogłoszeń</NuxtLink>
    <img v-if="advertisement.banner" :src="advertisement.banner" :alt="`Baner ${advertisement.name}`" class="banner-image">
    <div class="py-4">
      <h1>{{ advertisement.name }}</h1>
      <p><strong>Autor:</strong> {{ advertisement.user?.name || advertisement.user?.email || 'Nieznany' }}</p>
      <p><strong>Kategoria:</strong> {{ advertisement.category }}</p>
      <p>{{ advertisement.description }}</p>
      <p><strong>Telefon:</strong> {{ advertisement.phone }}</p>
      <p><strong>E-mail:</strong> {{ advertisement.email }}</p>
      <p v-if="advertisement.address"><strong>Lokalizacja:</strong> {{ advertisement.address }}</p>
    </div>
    <section v-if="advertisement.latitude !== null && advertisement.longitude !== null" class="location-section mb-4">
      <h2 class="h4">Lokalizacja ogłoszenia</h2>
      <LocationPreview
        :latitude="advertisement.latitude"
        :longitude="advertisement.longitude"
        :address="advertisement.address"
      />
    </section>
    <div v-if="images.length" class="gallery">
      <img v-for="image in images" :key="image" :src="image" :alt="`Zdjęcie ${advertisement.name}`" class="gallery-image">
    </div>
  </article>
</template>

<style scoped>
.banner-image {
  width: 100%;
  max-height: 360px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.gallery-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>