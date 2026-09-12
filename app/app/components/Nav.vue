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
    const isMenuOpen = ref(false);
    const { status, signOut } = useAuth();
    const { showToast } = useToast();

    const handleLogout = async () => {
        isMenuOpen.value = false;
        await signOut({ redirect: false });
        showToast('Wylogowano pomyślnie.', 'primary');
        await navigateTo('/');
    };
</script>

<style scoped>
.navbar-logo {
    height: 32px;
    width: auto;
    display: block;
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