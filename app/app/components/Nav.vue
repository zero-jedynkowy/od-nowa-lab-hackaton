<template>
    <!-- <NuxtLink to="/">Strona Główna</NuxtLink>
    <NuxtLink to="/login">Logowanie</NuxtLink>
    <NuxtLink to="/market">Market</NuxtLink> -->

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
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>


<style>
.navbar-logo {
        height: 32px;
        width: auto;
        display: block;
    }
</style>
