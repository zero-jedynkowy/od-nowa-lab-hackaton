<template>
  <div class="formularz-box">
    <input v-model="nowaNazwa" placeholder="Nazwa miejsca..." />
    <input v-model="nowyOpis" placeholder="Krótki opis..." />
    <button @click="dodaj">Dodaj pinezkę</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Odbieramy całą bazę danych z Płyty Głównej
const baza = defineModel()

const nowaNazwa = ref('')
const nowyOpis = ref('')

const dodaj = () => {
  if (nowaNazwa.value === '') return // Nie dodajemy pustych!

  baza.value.push({
    id: Date.now(),
    name: nowaNazwa.value,
    description: nowyOpis.value,
    // Lekko losowe współrzędne, żeby pinezki nie wpadły na siebie
    lat: 52.3477 + (Math.random() - 0.5) * 0.02,
    lng: 21.2464 + (Math.random() - 0.5) * 0.02,
    image: 'https://via.placeholder.com/150' // Domyślny obrazek
  })

  // Czyścimy okienka
  nowaNazwa.value = ''
  nowyOpis.value = ''
}
</script>

<style scoped>
.formularz-box {
  padding: 10px;
  background: #f4f4f4;
  border-radius: 8px;
  display: flex;
  gap: 10px;
  align-items: center;
}
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 8px 15px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
</style>