<script setup>
    import { defineModel } from 'vue';

    const model = defineModel({
        type: Object,
        default: () => ({
            username: '',
            password: '',
        })
    })

</script>


<template>
  <main class="cool-rectangel">
    <h1>Zaloguj się</h1>
    <div class="mb-3">
            <label for="username" class="form-label">Nazwa uzytkownika</label>
            <input type="text" class="form-control" id="username" aria-describedby="urzytkownik" v-model="model.username" placeholder="Wpisz nazwe uzytkownka">
    </div>
    <div class="mb-3">
            <label for="password" class="form-label">Haslo</label>
            <input type="password" class="form-control" id="password" aria-describedby="haslo" v-model="model.password" placeholder="Wpisz haslo">
    </div>
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
