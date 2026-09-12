<script setup>
const route = useRoute()
const searchInput = ref(String(route.query.search || ''))

const searchAdvertisements = () => {
    const search = searchInput.value.trim()
    navigateTo({
        path: route.path === '/market/map' ? '/market/map' : '/market/listings',
        query: search ? { search } : {},
    })
}

const resetSearchWhenEmpty = () => {
    if (!searchInput.value.trim() && route.query.search) {
        navigateTo({ path: route.path, query: {} })
    }
}
</script>

<template>
<div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3 market-navbar">
        <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <NuxtLink :to="{ path: '/market/listings', query: route.query }" class="nav-link active" aria-current="page">Ogloszenia</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink :to="{ path: '/market/map', query: route.query }" class="nav-link active" aria-current="page">Mapa</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/market/add" class="nav-link active" aria-current="page">Dodaj ogloszenie</NuxtLink>
                </li>
            </ul>
                <form class="market-search" role="search" @submit.prevent="searchAdvertisements">
                    <input v-model="searchInput" class="form-control" type="search" placeholder="Wyszukaj ogłoszenie" aria-label="Wyszukaj ogłoszenie" @input="resetSearchWhenEmpty">
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

.market-navbar .nav-link,
.market-navbar .nav-link.active,
.market-navbar .nav-link:hover,
.market-navbar .navbar-toggler {
        color: #ffffff !important;
}

.market-navbar .navbar-toggler {
        border-color: rgba(255, 255, 255, 0.65);
}

.market-search {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: min(100%, 360px);
}

.market-search .form-control {
    min-width: 0;
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

    @media (max-width: 991.98px) {
        .market-navbar .container-fluid {
            align-items: stretch;
        }

        .market-navbar .navbar-collapse {
            padding-top: 0.75rem;
        }

        .market-navbar .navbar-nav {
            width: 100%;
        }

        .market-search {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
            padding-top: 0.5rem;
        }

        .market-search .form-control,
        .market-search .btn {
            width: 100%;
            margin: 0;
        }
    }
</style>
