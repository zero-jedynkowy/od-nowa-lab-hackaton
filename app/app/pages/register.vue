<script setup>
    import { defineModel } from 'vue';

    const model = defineModel({
        type: Object,
        default: () => ({
            username: '',
            email:'',
            password: '',
        })
    })

</script>


<template>
  <main>
    <h1>Zarejestruj się</h1>
    <div class="mb-3">
            <label for="username" class="form-label">Nazwa uzytkownika</label>
            <input type="text" class="form-control" id="username" aria-describedby="urzytkownik" v-model="model.username" placeholder="Wpisz nazwe uzytkownka">
    </div>
    <div class="mb-3">
            <label for="email" class="form-label">email</label>
            <input type="text" class="form-control" id="email" aria-describedby="email" v-model="model.email" placeholder="Wpisz swoj email">
    </div>
    <div class="mb-3">
            <label for="password" class="form-label">Haslo</label>
            <input type="password" class="form-control" id="password" aria-describedby="haslo" v-model="model.password" placeholder="Wpisz haslo">
    </div>
  </main>
</template>
