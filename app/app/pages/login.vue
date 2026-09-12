<script setup>
import { ref } from 'vue'

const model = defineModel({
  type: Object,
  default: () => ({
    username: '',
    password: '',
  }),
})

const errorMessage = ref('')
const isSubmitting = ref(false)
const { signIn } = useAuth()

const submitLogin = async () => {
  const username = model.value.username.trim()
  const password = model.value.password.trim()

  if (!username || !password) {
    errorMessage.value = 'Wprowadź nazwę użytkownika i hasło.'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
      callbackUrl: '/'
    })

    if (result?.error) {
      errorMessage.value = 'Nieprawidłowa nazwa użytkownika lub hasło.'
      return
    }

    await navigateTo('/')
  } catch {
    errorMessage.value = 'Nie udało się zalogować. Spróbuj ponownie.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="cool-rectangel">
    <h1>Zaloguj się</h1>

    <form @submit.prevent="submitLogin">
      <div class="mb-3">
        <label for="username" class="form-label">Nazwa użytkownika</label>
        <input
          v-model="model.username"
          type="text"
          class="form-control"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Wpisz nazwę użytkownika"
        >
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Hasło</label>
        <input
          v-model="model.password"
          type="password"
          class="form-control"
          id="password"
          aria-describedby="passwordHelp"
          placeholder="Wpisz hasło"
        >
      </div>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <button type="submit" class="btn btn-primary w-100" :disabled="isSubmitting">
        {{ isSubmitting ? 'Logowanie...' : 'Zaloguj się' }}
      </button>
    </form>
  </main>
</template>

<style scoped>
.cool-rectangel {
  background-color: #f0f0f0;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  margin: 20px auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.error-message {
  color: #d93025;
  margin: 0;
  font-size: 0.9rem;
}
</style>
