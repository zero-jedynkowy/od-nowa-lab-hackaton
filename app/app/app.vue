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



<style scoped>
  main
  {
    max-width: 1024px;
    margin: 0 auto 0 auto;
    padding: 1rem;
    box-sizing: border-box;
  }
</style>

<style>
  .myBtn::before
  {
    margin-right: 5px;
  }
</style>
