<script setup>
const route = useRoute()
const searchInput = ref(String(route.query.search || ''))

const searchAdvertisements = () => {
    const search = searchInput.value.trim()
    navigateTo({
        path: '/market/listings',
        query: search ? { search } : {},
    })
}
</script>

<template>
<div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
        <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <NuxtLink to="/market/listings" class="nav-link active" aria-current="page">Ogloszenia</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/market/map" class="nav-link active" aria-current="page">Mapa</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/market/add" class="nav-link active" aria-current="page">Dodaj ogloszenie</NuxtLink>
                </li>
            </ul>
                <form class="d-flex" role="search" @submit.prevent="searchAdvertisements">
                    <input v-model="searchInput" class="form-control me-2" type="search" placeholder="Wyszukaj ogłoszenie" aria-label="Wyszukaj ogłoszenie">
                    <button class="btn btn-outline-success" type="submit">Szukaj</button>
                </form>
            </div>
        </div>
    </nav>

    <NuxtPage :transition="{ name: 'market-page', mode: 'out-in' }" />
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

  .navbar {
  --bs-navbar-color:                #6600cc;     /* zwykły link */
  --bs-navbar-hover-color:          #ffffff;     /* hover */
  --bs-navbar-active-color:         #ffffff;     /* aktywny */
  --bs-navbar-brand-color:          #9933ff;     /* "Navbar" */
  --bs-navbar-brand-hover-color:    #ffffff;

  background-color: #1e293b !important;
  border-radius: 8px;
}
</style>

<style>
    .market-page-enter-active,
    .market-page-leave-active {
        transition: opacity 0.25s ease, transform 0.25s ease;
    }

    .market-page-enter-from {
        opacity: 0;
        transform: translateY(0.75rem);
    }

    .market-page-leave-to {
        opacity: 0;
        transform: translateY(-0.5rem);
    }

  .myBtn::before
  {
    margin-right: 5px;
  }
</style>
