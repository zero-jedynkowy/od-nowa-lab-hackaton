<script setup>
definePageMeta({ middleware: 'admin' })

const { data, error, refresh } = await useFetch('/api/admin')
const { showToast } = useToast()

const formatDate = (value) => new Date(value).toLocaleString('pl-PL')

const removeUser = async (user) => {
  if (!window.confirm(`Usunąć użytkownika ${user.name || user.email}?`)) return
  try {
    await $fetch(`/api/admin/users/${user.id}`, { method: 'DELETE' })
    showToast('Użytkownik został usunięty.', 'success')
    await refresh()
  } catch (requestError) {
    showToast(requestError?.data?.statusMessage || 'Nie udało się usunąć użytkownika.', 'danger')
  }
}

const removeAdvertisement = async (advertisement) => {
  if (!window.confirm(`Usunąć ogłoszenie „${advertisement.name}”?`)) return
  try {
    await $fetch(`/api/admin/advertisements/${advertisement.id}`, { method: 'DELETE' })
    showToast('Ogłoszenie zostało usunięte.', 'success')
    await refresh()
  } catch (requestError) {
    showToast(requestError?.data?.statusMessage || 'Nie udało się usunąć ogłoszenia.', 'danger')
  }
}
</script>

<template>
  <section class="admin-page">
    <h1>Panel administratora</h1>
    <p v-if="error" class="text-danger">Nie udało się pobrać danych panelu.</p>
    <div v-if="data" class="admin-grid">
      <section class="admin-panel">
        <h2>Użytkownicy</h2>
        <div class="table-responsive">
          <table class="table table-striped align-middle">
            <thead><tr><th>Nazwa</th><th>E-mail</th><th>Rola</th><th>Ogłoszenia</th><th>Akcja</th></tr></thead>
            <tbody>
              <tr v-for="user in data.users" :key="user.id">
                <td>{{ user.name || '-' }}</td>
                <td>{{ user.email || '-' }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user._count.advertisements }}</td>
                <td><button v-if="user.role !== 'ADMIN'" class="btn btn-sm btn-outline-danger" @click="removeUser(user)">Usuń</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="admin-panel">
        <h2>Ogłoszenia</h2>
        <div class="table-responsive">
          <table class="table table-striped align-middle">
            <thead><tr><th>Nazwa</th><th>Autor</th><th>Kategoria</th><th>Dodano</th><th>Akcja</th></tr></thead>
            <tbody>
              <tr v-for="advertisement in data.advertisements" :key="advertisement.id">
                <td>{{ advertisement.name }}</td>
                <td>{{ advertisement.user?.name || advertisement.user?.email || '-' }}</td>
                <td>{{ advertisement.category }}</td>
                <td>{{ formatDate(advertisement.createdAt) }}</td>
                <td><button class="btn btn-sm btn-outline-danger" @click="removeAdvertisement(advertisement)">Usuń</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.admin-page { padding: 1rem 0 3rem; }
.admin-grid { display: grid; gap: 1.5rem; }
.admin-panel {
  padding: 1.25rem;
  border: 1px solid var(--app-border, #dbe2ea);
  border-radius: 0.5rem;
  background: var(--app-surface, #fff);
}
.admin-panel h2 { font-size: 1.25rem; margin-bottom: 1rem; }
</style>
