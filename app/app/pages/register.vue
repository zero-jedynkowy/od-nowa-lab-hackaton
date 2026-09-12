<script setup>
import { reactive, ref } from 'vue';

const form = reactive({
  username: '',
  email: '',
  password: '',
});

const errorMessage = ref('');
const successMessage = ref('');
const isSubmitting = ref(false);
const { showToast } = useToast();
const { signIn } = useAuth();

const register = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
    errorMessage.value = 'Wypełnij wszystkie pola.';
    showToast(errorMessage.value, 'danger');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(form.email)) {
    errorMessage.value = 'Podaj poprawny adres e-mail.';
    showToast(errorMessage.value, 'danger');
    return;
  }

  isSubmitting.value = true;

  try {
    const username = form.username.trim();
    const password = form.password;

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email: form.email.trim(),
        password,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data?.message || 'Błąd rejestracji.');
    }

    const loginResult = await signIn('credentials', {
      username,
      password,
      redirect: false,
      callbackUrl: '/',
    });

    if (loginResult?.error) {
      throw new Error('Konto utworzone, ale nie udało się zalogować automatycznie.');
    }

    successMessage.value = 'Konto utworzone i zalogowano pomyślnie.';
    showToast(successMessage.value, 'success');
    Object.assign(form, {
      username: '',
      email: '',
      password: '',
    });
    await navigateTo('/');
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Błąd rejestracji.';
    showToast(errorMessage.value, 'danger');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <main class="cool-rectangel">
    <h1>Zarejestruj się</h1>

    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="username" class="form-label">Nazwa użytkownika</label>
        <input
          v-model="form.username"
          type="text"
          class="form-control"
          id="username"
          aria-describedby="urzytkownik"
          placeholder="Wpisz nazwę użytkownika"
          required
        >
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">E-mail</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          id="email"
          aria-describedby="email"
          placeholder="Wpisz swój email"
          required
        >
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Hasło</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          id="password"
          aria-describedby="haslo"
          placeholder="Wpisz hasło"
          required
        >
      </div>

      <p v-if="errorMessage" class="text-danger mt-3 mb-3">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-success mt-3 mb-3">{{ successMessage }}</p>

      <button type="submit" class="btn btn-success" :disabled="isSubmitting">
        {{ isSubmitting ? 'Rejestracja...' : 'Rejestracja' }}
      </button>
    </form>
  </main>
</template>

<style scoped>
.cool-rectangel {
  background-color: var(--app-surface, #f0f0f0);
  color: var(--app-text, #172033);
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  margin: 20px auto;
  border: 1px solid var(--app-border, #dee2e6);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
}
</style>
