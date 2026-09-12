<template>
  <div class="search-box">
    <input 
      v-model="InputCity" 
      @keyup.enter="szukaj" 
      placeholder="Wpisz miasto (np. Warszawa)..." 
      class="search-input"
    />
    <button @click="szukaj" class="search-btn">Szukaj</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const MapSearch = defineModel({ default: null })
const InputCity = ref('')
const szukaj = async () => {
  if (!InputCity.value) return
  
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${InputCity.value}`)
    const data = await response.json()

    if (data.length > 0) {
      MapSearch.value = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        nazwa: data[0].display_name
      }
      
      InputCity.value = ''
    } else {
      alert("Nie znaleziono takiego miejsca!")
    }
  } catch (error) {
    console.error("Błąd API:", error)
  }
}
</script>

<style scoped>
.search-box {
  display: flex;
  gap: 8px;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}
.search-btn {
  padding: 8px 15px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.search-btn:hover {
  background: #45a049;
}
</style>