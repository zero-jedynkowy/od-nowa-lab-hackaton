<script setup>
useHead({
  script: [{
    innerHTML: `(function () {
      try {
        if (localStorage.getItem('dark-mode') === 'true') {
          document.documentElement.classList.add('dark-mode')
        }
      } catch (error) {}
    })()`,
  }],
})
</script>

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
  body {
    transition: none;
  }

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
