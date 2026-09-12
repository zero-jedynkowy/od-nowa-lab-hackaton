<script setup>
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'

definePageMeta({ middleware: 'auth' })

const tableElement = ref(null)
const dataTable = ref(null)
const account = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')
const emailForm = reactive({ email: '', currentPassword: '' })
const passwordForm = reactive({ currentPassword: '', newPassword: '', confirmation: '' })
const { showToast } = useToast()

const loadAccount = async () => {
  try {
    account.value = await $fetch('/api/account')
    emailForm.email = account.value.email || ''
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || 'Nie udało się pobrać danych konta.'
  } finally {
    isLoading.value = false
  }
}

const formatDate = (value) => new Date(value).toLocaleString('pl-PL')

const initializeTable = async () => {
  if (!tableElement.value || dataTable.value || !account.value) return
  const { default: DataTable } = await import('datatables.net-bs5')
  dataTable.value = new DataTable(tableElement.value, {
    data: account.value.advertisements,
    columns: [
      { data: 'name', title: 'Nazwa' },
      { data: 'category', title: 'Kategoria' },
      { data: 'createdAt', title: 'Dodano', render: formatDate },
      {
        data: 'id',
        title: 'Akcje',
        orderable: false,
        searchable: false,
        render: (id) => `<a class="btn btn-sm btn-outline-success" href="/market/${id}">Szczegóły</a>`,
      },
    ],
    language: {
      search: 'Szukaj:',
      lengthMenu: 'Pokaż _MENU_ pozycji',
      info: 'Pozycje _START_–_END_ z _TOTAL_',
      zeroRecords: 'Brak pasujących ogłoszeń',
      emptyTable: 'Nie masz jeszcze ogłoszeń',
      paginate: { first: 'Pierwsza', last: 'Ostatnia', next: 'Następna', previous: 'Poprzednia' },
    },
    pageLength: 10,
  })
}

const updateAccount = async (payload, form) => {
  try {
    await $fetch('/api/account', { method: 'PATCH', body: payload })
    showToast('Dane konta zostały zmienione.', 'success')
    Object.keys(form).forEach((key) => { form[key] = '' })
    await loadAccount()
  } catch (error) {
    showToast(error?.data?.statusMessage || 'Nie udało się zmienić danych konta.', 'danger')
  }
}

const changeEmail = () => updateAccount({ email: emailForm.email, currentPassword: emailForm.currentPassword }, emailForm)
const changePassword = () => {
  if (passwordForm.newPassword !== passwordForm.confirmation) {
    showToast('Hasła nie są takie same.', 'danger')
    return
  }
  return updateAccount({ currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword }, passwordForm)
}

onMounted(async () => {
  await loadAccount()
  await nextTick()
  await initializeTable()
})

onBeforeUnmount(() => dataTable.value?.destroy())
</script>

<template>
  <section class="account-page">
    <h1>Moje konto</h1>
    <p v-if="isLoading">Ładowanie danych konta...</p>
    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

    <div v-if="account" class="account-grid">
      <section class="account-panel">
        <h2>Moje ogłoszenia</h2>
        <div class="table-responsive">
          <table ref="tableElement" class="table table-striped align-middle w-100"></table>
        </div>
      </section>

      <section class="account-panel">
        <h2>Zmień e-mail</h2>
        <form @submit.prevent="changeEmail">
          <label class="form-label" for="account-email">Nowy e-mail</label>
          <input id="account-email" v-model="emailForm.email" class="form-control mb-2" type="email" required>
          <label class="form-label" for="email-password">Bieżące hasło</label>
          <input id="email-password" v-model="emailForm.currentPassword" class="form-control mb-3" type="password" required>
          <button class="btn btn-success" type="submit">Zmień e-mail</button>
        </form>
      </section>

      <section class="account-panel">
        <h2>Zmień hasło</h2>
        <form @submit.prevent="changePassword">
          <label class="form-label" for="current-password">Bieżące hasło</label>
          <input id="current-password" v-model="passwordForm.currentPassword" class="form-control mb-2" type="password" required>
          <label class="form-label" for="new-password">Nowe hasło</label>
          <input id="new-password" v-model="passwordForm.newPassword" class="form-control mb-2" type="password" minlength="8" required>
          <label class="form-label" for="password-confirmation">Powtórz nowe hasło</label>
          <input id="password-confirmation" v-model="passwordForm.confirmation" class="form-control mb-3" type="password" minlength="8" required>
          <button class="btn btn-success" type="submit">Zmień hasło</button>
        </form>
      </section>
    </div>
  </section>
</template>

<style scoped>
.account-page {
  padding: 1rem 0 3rem;
}

.account-grid {
  display: grid;
  gap: 1.5rem;
}

.account-panel {
  padding: 1.25rem;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  background: #fff;
}

.account-panel h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
</style>