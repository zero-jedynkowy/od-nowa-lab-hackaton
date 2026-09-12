<template>
  <div>
    <NuxtRouteAnnouncer />
    <Nav></Nav>
    <main>
      <NuxtPage />
    </main>

    <Footer></Footer>
  </div>
</template>

<!-- <script setup>
  import "@fontsource/libre-barcode-39-extended-text";
</script> -->

<style scoped>
  main
  {
    max-width: 1024px;
    margin: 0 auto 0 auto;
    padding: 1rem;
    box-sizing: border-box;
    min-height: 100vh;
    /* font-family: 'Libre Barcode 39 Extended Text'; */
  }
</style>

<style>
  .myBtn::before
  {
    margin-right: 5px;
  }
</style>
