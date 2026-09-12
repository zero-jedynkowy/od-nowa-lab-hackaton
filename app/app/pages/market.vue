<template>
<div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
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
            </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Wyszukaj ogloszenie" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>

    <NuxtPage />
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
}
</style>

<style>
  .myBtn::before
  {
    margin-right: 5px;
  }
</style>
