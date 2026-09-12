<script setup>
const route = useRoute()
const uuid = route.params.uuid

// na razie atrapa — potem podmienisz na useFetch
const item = ref({
  uuid,
  title: 'An example item',
  description: 'Lorem ipsum dolor sit amet...',
  createdAt: '11-09-2001, 11:33:00',
  price: '250 zł',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIgC60W2hgcwFvfBw9tRqyMW7cFxKt3ZaVgR3sepdejg&s=10'
})
</script>

<template>
  <div class="container py-4">
    <NuxtLink to="/market/listings" class="btn btn-outline-secondary btn-sm mb-3">
      <i class="bi bi-arrow-left"></i> Wróć do listy
    </NuxtLink>

    <div class="row g-4">
      <div class="col-md-6">
        <img :src="item.image" :alt="item.title" class="img-fluid rounded w-100" />
      </div>

      <div class="col-md-6">
        <h1 class="h3">{{ item.title }}</h1>
        <p class="h4 text-success">{{ item.price }}</p>
        <p class="text-body-secondary">
          <small>Dodano: {{ item.createdAt }}</small>
        </p>
        <hr />
        <p>{{ item.description }}</p>
        <button class="btn btn-success">Skontaktuj się</button>
      </div>
    </div>
  </div>
</template>
