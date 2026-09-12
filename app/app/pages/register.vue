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

const register = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
    errorMessage.value = 'Wypełnij wszystkie pola.';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(form.email)) {
    errorMessage.value = 'Podaj poprawny adres e-mail.';
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data?.message || 'Błąd rejestracji.');
    }

    successMessage.value = data?.message || 'Rejestracja zakończona pomyślnie.';
    Object.assign(form, {
      username: '',
      email: '',
      password: '',
    });
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Błąd rejestracji.';
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
  background-color: #f0f0f0;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  margin: 20px auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
