<template>
  <div class="przelacznik-box">
    <label>
      <input type="checkbox" v-model="stan" />
      Pokaż pinezki
    </label>
  </div>
</template>

<script setup>
const stan = defineModel()
</script>

<style scoped>
.przelacznik-box {
  padding: 10px 20px;
  background: #333;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  display: flex;
  align-items: center;
}
input {
  margin-right: 8px;
  transform: scale(1.2);
}
</style>