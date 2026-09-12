<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <NuxtLink to="/" class="navbar-brand">
                <img src="/Wolomin_herb.png" alt="Wołomin" class="navbar-logo" />
            </NuxtLink>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <NuxtLink to="/market/listings" class="nav-link active" aria-current="page">Kup i sprzedaj</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink to="/city/design" class="nav-link active" aria-current="page">Miasto 2.0</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink to="/city/active" class="nav-link active" aria-current="page">Aktywne Miasto</NuxtLink>
                    </li>
                </ul>
                
                <!-- Sekcja przycisków autoryzacji -->
                <div class="d-flex gap-2" aria-label="Autoryzacja">
                    <!-- Widoczne tylko dla ZALOGOWANEGO -->
                    <button 
                        v-if="status === 'authenticated'" 
                        @click="handleLogout" 
                        class="btn btn-outline-danger" 
                        type="button"
                    >
                        Wyloguj
                    </button>
                    
                    <!-- Widoczne tylko dla NIEZALOGOWANEGO (Gościa) -->
                    <template v-else-if="status !== 'authenticated'">
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
// Wyciągamy 'status' do warunków v-if oraz 'signOut' do przycisku wylogowania
const { status, signOut } = useAuth();

// Funkcja wylogowania - po kliknięciu wyloguje i przeniesie na stronę główną
const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
}
</script>

<style scoped>
.navbar-logo {
    height: 32px;
    width: auto;
    display: block;
}
</style>