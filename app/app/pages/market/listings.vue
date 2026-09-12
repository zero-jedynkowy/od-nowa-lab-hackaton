<script setup>
const route = useRoute()
const items = ref([])
const page = ref(1)
const hasMore = ref(true)
const isLoading = ref(false)
const loadError = ref('')
const sentinel = ref(null)
let observer

const search = computed(() => String(route.query.search || '').trim())

const loadItems = async (reset = false) => {
  if (isLoading.value || (!hasMore.value && !reset)) return

  if (reset) {
    page.value = 1
    hasMore.value = true
    items.value = []
  }

  isLoading.value = true
  loadError.value = ''

  try {
    const response = await $fetch('/api/advertisements', {
      query: { page: page.value, limit: 10, search: search.value },
    })

    items.value.push(...response.items)
    hasMore.value = response.hasMore
    page.value += 1
  } catch {
    loadError.value = 'Nie udało się pobrać ogłoszeń.'
  } finally {
    isLoading.value = false
  }
}

watch(search, () => loadItems(true), { immediate: true })

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) loadItems()
  }, { rootMargin: '300px' })

  if (sentinel.value) observer.observe(sentinel.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>


<template>
  <div class="listings-page">
    <p v-if="!isLoading && !items.length && !loadError" class="text-body-secondary">Brak ogłoszeń.</p>
    <MarketItem v-for="item in items" :key="item.id" :model-value="item" />
    <p v-if="loadError" class="text-danger">{{ loadError }}</p>
    <p v-if="isLoading" class="text-body-secondary text-center py-3">Ładowanie ogłoszeń...</p>
    <p v-else-if="!hasMore && items.length" class="text-body-secondary text-center py-3">To już wszystkie ogłoszenia.</p>
    <div ref="sentinel" class="listings-sentinel" aria-hidden="true"></div>
  </div>
</template>

<style scoped>
  main
  {
    max-width: 1024px;
    margin: 0 auto 0 auto;
    padding: 1rem;
    box-sizing: border-box;
  }
</style>

<style>
  .myBtn::before
  {
    margin-right: 5px;
  }
</style>
