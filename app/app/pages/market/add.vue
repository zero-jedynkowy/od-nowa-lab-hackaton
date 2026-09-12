<script setup>
import { reactive, ref } from 'vue'

definePageMeta({ middleware: 'auth' })

const form = reactive({
    name: '',
    description: '',
    category: '',
    phone: '',
    email: '',
    sociale: { fb: '', ig: '', x: '' },
})

const logo = ref(null)
const banner = ref(null)
const images = ref([])

const errorMessage = ref('')
const isSubmitting = ref(false)
const { showToast } = useToast()

const submitAdvertisement = async () => {
    errorMessage.value = ''
    isSubmitting.value = true

    try {
        const body = new FormData()
        body.append('name', form.name)
        body.append('description', form.description)
        body.append('category', form.category)
        body.append('phone', form.phone)
        body.append('email', form.email)
        body.append('sociale.fb', form.sociale.fb)
        body.append('sociale.ig', form.sociale.ig)
        body.append('sociale.x', form.sociale.x)
        if (logo.value) body.append('logo', logo.value)
        if (banner.value) body.append('banner', banner.value)
        images.value.forEach((image) => body.append('images', image))

        await $fetch('/api/advertisements', { method: 'POST', body })
        showToast('Ogłoszenie zostało dodane.', 'success')
        Object.assign(form, {
            name: '', description: '', category: '', phone: '', email: '',
            sociale: { fb: '', ig: '', x: '' },
        })
        logo.value = null
        banner.value = null
        images.value = []
    } catch (error) {
        errorMessage.value = error?.data?.statusMessage || 'Nie udało się dodać ogłoszenia.'
        showToast(errorMessage.value, 'danger')
    } finally {
        isSubmitting.value = false
    }
}
</script>


<template>
    <form @submit.prevent="submitAdvertisement">

        <div class="mb-3">
            <h1>Dodaj ogłoszenie</h1>
        </div>

        <div class="mb-3">
            <label for="name" class="form-label">Nazwa ogłoszenia</label>
            <input type="text" class="form-control" id="name" v-model="form.name" placeholder="Wpisz nazwę ogłoszenia" maxlength="1024" required>
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Opis</label>
            <textarea class="form-control description-field" placeholder="Wpisz opis ogłoszenia" id="description" v-model="form.description" maxlength="1024" required></textarea>
        </div>

        <div class="mb-3">
            <label for="category" class="form-label">Kategoria</label>
            <select class="form-select" id="category" v-model="form.category" required>
                <option disabled value="">Wybierz kategorię</option>
                <option value="Gastronomia">Gastronomia</option>
                <option value="Rzemiosło">Rzemiosło</option>
                <option value="Usługi">Usługi</option>
                <option value="Inne">Inne</option>
            </select>
        </div>


        <div class="mb-3">
            <label for="phone" class="form-label">Telefon</label>
            <input type="tel" class="form-control" id="phone" v-model="form.phone" placeholder="Wpisz numer telefonu" maxlength="1024" required>
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" v-model="form.email" placeholder="Wpisz adres e-mail" maxlength="1024" required>
        </div>

        <fieldset class="mb-3">
            <legend class="form-label">Social media</legend>
            <input v-model="form.sociale.fb" type="url" class="form-control mb-2" placeholder="Facebook" maxlength="1024">
            <input v-model="form.sociale.ig" type="url" class="form-control mb-2" placeholder="Instagram" maxlength="1024">
            <input v-model="form.sociale.x" type="url" class="form-control" placeholder="X" maxlength="1024">
        </fieldset>

        <div class="mb-3">
            <label for="logo" class="form-label">Logo</label>
            <input id="logo" class="form-control" type="file" accept="image/jpeg,image/png,image/webp,image/gif" @change="logo = $event.target.files?.[0] || null">
        </div>

        <div class="mb-3">
            <label for="banner" class="form-label">Baner</label>
            <input id="banner" class="form-control" type="file" accept="image/jpeg,image/png,image/webp,image/gif" @change="banner = $event.target.files?.[0] || null">
        </div>

        <div class="mb-3">
            <label for="images" class="form-label">Zdjęcia dodatkowe (maksymalnie 10)</label>
            <input id="images" class="form-control" type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple @change="images = Array.from($event.target.files || []).slice(0, 10)">
        </div>

        <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Dodawanie...' : 'Dodaj ogłoszenie' }}
        </button>
    </form>
</template>

<style scoped>
    .description-field 
    {
        resize: none;
        height: 200px;
    }
</style>