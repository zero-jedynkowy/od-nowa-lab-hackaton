<style>
:root {
    --app-bg: #f8fafc;
    --app-surface: #ffffff;
    --app-text: #172033;
    --app-muted: #64748b;
    --app-border: #dbe2ea;
}

html.dark-mode {
    --app-bg: #111827;
    --app-surface: #1f2937;
    --app-text: #f8fafc;
    --app-muted: #cbd5e1;
    --app-border: #475569;
    color-scheme: dark;
}

body {
    background-color: var(--app-bg);
    color: var(--app-text);
  transition: background-color 0.3s, color 0.3s;
}

/* NAVBAR */
.navbar {
    background-color: var(--app-surface) !important;
    border-bottom: 1px solid var(--app-border);
    color: var(--app-text) !important;
}

.nav-link {
    color: var(--app-text) !important;
}

a:not(.btn) {
    color: inherit;
}

.card,
.account-panel,
.admin-panel,
.table {
    background-color: var(--app-surface);
    color: var(--app-text);
    border-color: var(--app-border);
}

html.dark-mode .account-panel .table {
        --bs-table-bg: var(--app-surface);
        --bs-table-color: var(--app-text);
        --bs-table-striped-bg: #273449;
        --bs-table-striped-color: var(--app-text);
        --bs-table-hover-bg: #334155;
        --bs-table-hover-color: var(--app-text);
        --bs-table-border-color: var(--app-border);
}

    html.dark-mode .admin-panel .table {
        --bs-table-bg: var(--app-surface);
        --bs-table-color: var(--app-text);
        --bs-table-striped-bg: #273449;
        --bs-table-striped-color: var(--app-text);
        --bs-table-hover-bg: #334155;
        --bs-table-hover-color: var(--app-text);
        --bs-table-border-color: var(--app-border);
    }

    html.dark-mode .admin-panel .table thead th {
        color: #f8fafc;
        background-color: #172033;
    }

html.dark-mode .account-panel .dataTables_info,
html.dark-mode .account-panel .dataTables_length,
html.dark-mode .account-panel .dataTables_filter {
        color: var(--app-muted);
}

html.dark-mode .account-panel .dataTables_wrapper .pagination .page-link {
    background-color: #273449;
    border-color: var(--app-border);
    color: #e2e8f0;
}

html.dark-mode .account-panel .dataTables_wrapper .pagination .page-link:hover {
    background-color: #3b4d68;
    border-color: #64748b;
    color: #ffffff;
}

html.dark-mode .account-panel .dataTables_wrapper .pagination .page-item.active .page-link {
    background-color: #ffc107;
    border-color: #ffc107;
    color: #172033;
    font-weight: 700;
}

html.dark-mode .account-panel .dataTables_wrapper .pagination .page-item.disabled .page-link {
    background-color: #1f2937;
    border-color: #334155;
    color: #64748b;
}

html.dark-mode .account-panel .dt-paging .dt-paging-button {
    background: #273449 !important;
    border: 1px solid var(--app-border) !important;
    color: #e2e8f0 !important;
    border-radius: 0.35rem;
    margin-left: 0.25rem;
}

html.dark-mode .account-panel .dt-paging .dt-paging-button:hover {
    background: #3b4d68 !important;
    border-color: #64748b !important;
    color: #ffffff !important;
}

html.dark-mode .account-panel .dt-paging .dt-paging-button.current {
    background: #ffc107 !important;
    border-color: #ffc107 !important;
    color: #172033 !important;
    font-weight: 700;
}

html.dark-mode .account-panel .dt-paging .dt-paging-button.disabled,
html.dark-mode .account-panel .dt-paging .dt-paging-button.disabled:hover {
    background: #1f2937 !important;
    border-color: #334155 !important;
    color: #64748b !important;
    cursor: not-allowed;
}

input,
textarea,
select {
    background-color: var(--app-surface) !important;
    color: var(--app-text) !important;
    border-color: var(--app-border) !important;
}

input::placeholder,
textarea::placeholder {
    color: var(--app-muted) !important;
    opacity: 1;
}

.text-body-secondary {
    color: var(--app-muted) !important;
}

.footer {
    background-color: var(--app-surface) !important;
    color: var(--app-text) !important;
}
</style>



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
                        <NuxtLink to="/market/listings" class="nav-link" active-class="active" exact-active-class="active" @click="isMenuOpen = false">Ryneczek</NuxtLink>
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
                    <NuxtLink
                        v-if="status === 'authenticated' && data?.user?.role === 'ADMIN'"
                        to="/admin"
                        class="btn btn-outline-warning"
                        @click="isMenuOpen = false"
                    >
                        Panel admina
                    </NuxtLink>
                    <NuxtLink
                        v-if="status === 'authenticated'"
                        to="/account"
                        class="btn btn-outline-primary"
                        active-class="active"
                        aria-label="Przejdź do mojego konta"
                        @click="isMenuOpen = false"
                    >
                        Moje konto
                    </NuxtLink>
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
import { onMounted, ref } from 'vue'

const isMenuOpen = ref(false)
const isDarkMode = ref(false)
const { status, data, signOut } = useAuth()
const { showToast } = useToast()

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('dark-mode', String(isDarkMode.value))
    document.documentElement.classList.toggle('dark-mode', isDarkMode.value)
}

const handleLogout = async () => {
    isMenuOpen.value = false
    await signOut({ redirect: false })
    showToast('Wylogowano pomyślnie.', 'primary')
    await navigateTo('/')
}

onMounted(() => {
    isDarkMode.value = localStorage.getItem('dark-mode') === 'true'
    document.documentElement.classList.toggle('dark-mode', isDarkMode.value)
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
    background-color: transparent;
    border-color: #ffc107;
    color: #ffc107;
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
