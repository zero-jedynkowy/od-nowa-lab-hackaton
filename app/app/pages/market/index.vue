<script setup>
    const example = ref({uuid: '125f8ec3-5699-46b1-aacf-985223214f54', title: 'An example item', 
    description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta dui elit, at maximus metus suscipit a. Nunc sollicitudin nunc non tempus vehicula. Quisque suscipit quam sed dignissim tempus. Vivamus eu porta magna, nec malesuada neque. Cras posuere quam sed ex sodales suscipit. Nullam aliquet fermentum velit et semper. Pellentesque feugiat, purus in aliquam egestas, eros tortor blandit orci, a finibus tellus arcu vitae justo. Aenean eleifend, lorem vitae auctor congue, tellus sem finibus mi, aliquam dignissim mi nunc quis nunc. Praesent molestie molestie metus, id pellentesque ante egestas sit amet. Aliquam pulvinar velit a nunc volutpat bibendum. Aliquam egestas nisi dolor, eget cursus odio tempor vel. Donec laoreet tellus et orci lacinia, in dictum leo molestie. ',
    createdAt: '11-09-2001, 11:33:00'
})



</script>

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

    <MarketItem v-model="example"></MarketItem>
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
