<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div class="container-fluid">
            <NuxtLink to="/" class="navbar-brand">
                <img src="/Wolomin_herb.png" alt="Wołomin" class="navbar-logo" />
            </NuxtLink>




            <button class="navbar-toggler" type="button" @click="isMenuOpen = !isMenuOpen"
                aria-controls="navbarSupportedContent" :aria-expanded="isMenuOpen" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div id="navbarSupportedContent" class="navbar-collapse nav-menu" :class="{ 'nav-menu--open  mt-2': isMenuOpen }">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <NuxtLink to="/market/listings" class="nav-link" active-class="active" exact-active-class="active" @click="isMenuOpen = false">Kup i sprzedaj</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink to="/city/design" class="nav-link" active-class="active" exact-active-class="active" @click="isMenuOpen = false">Miasto 2.0</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink to="/city/active" class="nav-link" active-class="active" exact-active-class="active" @click="isMenuOpen = false">Aktywne Miasto</NuxtLink>
                    </li>
                </ul>

            <div class="accessibility-buttons">
                    <!-- DARK MODE BUTTON -->
                <button
                  class="btn btn-dark-mode"
                  @click="toggleDarkMode"
                  :title="isDarkMode ? 'Jasny' : 'Ciemny'"
                  aria-label="Przełącz tryb ciemny">
                  <i :class="isDarkMode ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill'"></i>
                </button>
            </div>


            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

                <div class="d-flex gap-2 nav-actions" aria-label="Autoryzacja">
                    <button 
                        v-if="status === 'authenticated'" 
                        @click="handleLogout" 
                        class="btn btn-outline-danger" 
                        type="button"
                    >
                        Wyloguj
                    </button>

                    <template v-else-if="status === 'unauthenticated'">
                        <NuxtLink
                            to="/login"
                            class="btn btn-outline-success"
                            aria-label="Przejdź do strony logowania"
                        >
                            Zaloguj
                        </NuxtLink>
                        <NuxtLink
                            to="/register"
                            class="btn btn-success"
                            aria-label="Przejdź do strony rejestracji"
                        >
                            Zarejestruj
                        </NuxtLink>
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isMenuOpen = ref(false)
const { status, signOut } = useAuth()
const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('dark-mode', isDarkMode.value.toString())

  const body = document.body
  if (isDarkMode.value) {
    body.style.background = '#1a1a1a'
    body.style.color = 'white'
    body.classList.add('dark-mode')
  } else {
    body.style.background = 'white'
    body.style.color = 'black'
    body.classList.remove('dark-mode')
  }
}

const handleLogout = async () => {
  isMenuOpen.value = false
  await signOut({ callbackUrl: '/' })
}

onMounted(() => {
  isDarkMode.value = localStorage.getItem('dark-mode') === 'true'
  const body = document.body
  if (isDarkMode.value) {
    body.style.background = '#1a1a1a'
    body.style.color = 'white'
    body.classList.add('dark-mode')
  }
})
</script>


<style scoped>
.navbar-logo {
    height: 32px;
    width: auto;
    display: block;
}

.btn-dark-mode {
    background-color: transparent;
    border: 2px solid currentColor;
    color: currentColor;
    padding: 8px 12px;
    margin: 0 10px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s;
}

.btn-dark-mode:hover {
    background-color: currentColor;
    color: var(--bs-body-bg);
}

.navbar-brand {
    flex-shrink: 0;
}

.navbar {
    position: sticky;
    top: 0;
    z-index: 1020;
}

.navbar > .container-fluid {
    position: relative;
}

.nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1021;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: var(--bs-body-bg);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    padding: 0 1rem 1rem;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
    transform: translateY(-10px);
    transition: max-height 0.35s ease, opacity 0.25s ease, transform 0.35s ease;
}

.nav-menu--open {
    max-height: 500px;
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.navbar-nav,
.nav-actions {
    width: 100%;
}

.navbar-nav {
    margin: 0;
    padding-top: 0.5rem;
    flex-direction: column;
}

.nav-item {
    width: 100%;
}

.nav-link {
    display: block;
    padding: 0.5rem 0;
    white-space: nowrap;
}

.nav-actions {
    flex-wrap: wrap;
    justify-content: flex-start;
}

@media (min-width: 992px) {
    .nav-menu,
    .nav-menu--open {
        position: static;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        max-height: none;
        opacity: 1;
        pointer-events: auto;
        overflow: visible;
        transform: none;
        box-shadow: none;
        border: 0;
        padding: 0;
        background: transparent;
        width: 100%;
    }

    .navbar-nav {
        width: auto;
        margin-bottom: 0 !important;
        padding-top: 0;
        flex-direction: row;
    }

    .nav-actions {
        width: auto;
        flex-wrap: nowrap;
        justify-content: flex-end;
    }
}
</style>
