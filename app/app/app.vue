<template>
  <div>
    <NuxtRouteAnnouncer />
    <ToastNotification />
    <Nav></Nav>
    <main>
      <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
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
    min-height: 100vh;
  }
</style>

<style>
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .page-enter-from {
    opacity: 0;
    transform: translateY(0.75rem);
  }

  .page-leave-to {
    opacity: 0;
    transform: translateY(-0.5rem);
  }

  .myBtn::before
  {
    margin-right: 5px;
  }
</style>
