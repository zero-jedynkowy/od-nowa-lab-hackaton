<script setup>
const route = useRoute()

definePageMeta({ middleware: 'auth' })

const { data: advertisement, error } = await useFetch(`/api/advertisements/${route.params.id}`)
if (error.value) {
  throw createError({ statusCode: error.value.statusCode || 404, statusMessage: error.value.statusMessage || 'Nie znaleziono ogłoszenia.' })
}

const form = reactive({
  name: advertisement.value?.name || '',
  description: advertisement.value?.description || '',
  category: advertisement.value?.category || '',
  phone: advertisement.value?.phone || '',
  email: advertisement.value?.email || '',
  sociale: {
    fb: advertisement.value?.sociale?.fb || '',
    ig: advertisement.value?.sociale?.ig || '',
    x: advertisement.value?.sociale?.x || '',
  },
})
const location = reactive({
  address: advertisement.value?.address || '',
  latitude: advertisement.value?.latitude ?? null,
  longitude: advertisement.value?.longitude ?? null,
})
const logo = ref(null)
const banner = ref(null)
const images = ref([])
const removeLogo = ref(false)
const removeBanner = ref(false)
const replaceImages = ref(false)
const errorMessage = ref('')
const isSubmitting = ref(false)
const { showToast } = useToast()

const submitEdit = async () => {
  errorMessage.value = ''
  if (location.latitude === null || location.longitude === null) {
    errorMessage.value = 'Wybierz lokalizację ogłoszenia na mapie.'
    showToast(errorMessage.value, 'danger')
    return
  }

  isSubmitting.value = true
  try {
    const body = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'sociale') return
      body.append(key, value)
    })
    body.append('sociale.fb', form.sociale.fb)
    body.append('sociale.ig', form.sociale.ig)
    body.append('sociale.x', form.sociale.x)
    body.append('address', location.address)
    body.append('latitude', String(location.latitude))
    body.append('longitude', String(location.longitude))
    body.append('removeLogo', String(removeLogo.value))
    body.append('removeBanner', String(removeBanner.value))
    body.append('replaceImages', String(replaceImages.value))
    if (logo.value) body.append('logo', logo.value)
    if (banner.value) body.append('banner', banner.value)
    images.value.forEach((image) => body.append('images', image))

    await $fetch(`/api/advertisements/${route.params.id}`, { method: 'PATCH', body })
    showToast('Ogłoszenie zostało zmienione.', 'success')
    await navigateTo('/account')
  } catch (requestError) {
    errorMessage.value = requestError?.data?.statusMessage || 'Nie udało się zmienić ogłoszenia.'
    showToast(errorMessage.value, 'danger')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form class="edit-advertisement" @submit.prevent="submitEdit">
    <NuxtLink to="/account" class="btn btn-outline-secondary mb-3">Wróć do konta</NuxtLink>
    <h1>Edytuj ogłoszenie</h1>

    <div class="mb-3">
      <label for="edit-name" class="form-label">Nazwa ogłoszenia</label>
      <input id="edit-name" v-model="form.name" class="form-control" type="text" maxlength="1024" required>
    </div>
    <div class="mb-3">
      <label for="edit-description" class="form-label">Opis</label>
      <textarea id="edit-description" v-model="form.description" class="form-control description-field" maxlength="1024" required></textarea>
    </div>
    <div class="mb-3">
      <label for="edit-category" class="form-label">Kategoria</label>
      <select id="edit-category" v-model="form.category" class="form-select" required>
        <option disabled value="">Wybierz kategorię</option>
        <option value="Gastronomia">Gastronomia</option>
        <option value="Rzemiosło">Rzemiosło</option>
        <option value="Usługi">Usługi</option>
        <option value="Inne">Inne</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="edit-phone" class="form-label">Telefon</label>
      <input id="edit-phone" v-model="form.phone" class="form-control" type="tel" maxlength="1024" required>
    </div>
    <div class="mb-3">
      <label for="edit-email" class="form-label">E-mail</label>
      <input id="edit-email" v-model="form.email" class="form-control" type="email" maxlength="1024" required>
    </div>

    <fieldset class="mb-3">
      <legend class="form-label">Social media</legend>
      <input v-model="form.sociale.fb" class="form-control mb-2" type="url" placeholder="Facebook" maxlength="1024">
      <input v-model="form.sociale.ig" class="form-control mb-2" type="url" placeholder="Instagram" maxlength="1024">
      <input v-model="form.sociale.x" class="form-control" type="url" placeholder="X" maxlength="1024">
    </fieldset>

    <fieldset class="mb-3">
      <legend class="form-label">Lokalizacja ogłoszenia</legend>
      <LocationPicker v-model="location" />
    </fieldset>

    <fieldset class="mb-3">
      <legend class="form-label">Media</legend>
      <p v-if="advertisement.logo" class="mb-2">Obecne logo: <img :src="advertisement.logo" alt="Obecne logo" class="current-logo"></p>
      <label for="edit-logo" class="form-label">Nowe logo</label>
      <input id="edit-logo" class="form-control mb-2" type="file" accept="image/jpeg,image/png,image/webp,image/gif" @change="logo = $event.target.files?.[0] || null">
      <label class="form-check mb-3">
        <input v-model="removeLogo" class="form-check-input" type="checkbox">
        <span class="form-check-label">Usuń obecne logo</span>
      </label>

      <p v-if="advertisement.banner" class="mb-2">Obecny baner: <img :src="advertisement.banner" alt="Obecny baner" class="current-banner"></p>
      <label for="edit-banner" class="form-label">Nowy baner</label>
      <input id="edit-banner" class="form-control mb-2" type="file" accept="image/jpeg,image/png,image/webp,image/gif" @change="banner = $event.target.files?.[0] || null">
      <label class="form-check mb-3">
        <input v-model="removeBanner" class="form-check-input" type="checkbox">
        <span class="form-check-label">Usuń obecny baner</span>
      </label>

      <label for="edit-images" class="form-label">Nowa galeria zdjęć (maksymalnie 10)</label>
      <input id="edit-images" class="form-control mb-2" type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple @change="images = Array.from($event.target.files || []).slice(0, 10); replaceImages = true">
      <label class="form-check">
        <input v-model="replaceImages" class="form-check-input" type="checkbox">
        <span class="form-check-label">Zastąp obecną galerię wybranymi zdjęciami</span>
      </label>
    </fieldset>

    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
    <button class="btn btn-primary" type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Zapisywanie...' : 'Zapisz zmiany' }}
    </button>
  </form>
</template>

<style scoped>
.edit-advertisement {
  padding-bottom: 2rem;
}

.description-field {
  min-height: 180px;
  resize: vertical;
}

.current-logo {
  display: block;
  width: 120px;
  height: 80px;
  object-fit: contain;
}

.current-banner {
  display: block;
  width: 240px;
  max-height: 100px;
  object-fit: cover;
}
</style>
