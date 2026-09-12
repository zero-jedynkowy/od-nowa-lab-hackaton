<template>
  <footer class="footer bg-dark text-white mt-5">
    <div class="container-fluid py-5">
      <div class="row">
        <div class="col-md-3 mb-4">
          <h5>O nas</h5>
          <p>Wołomin - Miasto przyszłości</p>
          <p>Pozdrawiam z rodzinka</p>
        </div>
        <div class="col-md-3 mb-4">
          <h5>Szybkie linki</h5>
          <ul class="list-unstyled">
            <li><NuxtLink to="/">Strona główna</NuxtLink></li>
            <li><NuxtLink to="/market/listings">Kup i sprzedaj</NuxtLink></li>
            <li><NuxtLink to="/city/design">Miasto 2.0</NuxtLink></li>
            <li><NuxtLink to="/city/active">Aktywne Miasto</NuxtLink></li>
          </ul>
        </div>
        <div class="col-md-3 mb-4">
          <h5>Kontakt</h5>
          <p>Email: kontakt@wolomin.pl</p>
          <p>Tel: +48 22 XXX XX XX</p>
        </div>
        <div class="col-md-3 mb-4">
          <h5>Regulamin strony</h5>
          <p><NuxtLink to="/terms">Regulamin strony</NuxtLink></p>
        </div>
      </div>
      <hr class="bg-secondary">
      <div class="text-center">
        <p>&copy; 2026 Wołomin. Wszystkie prawa zastrzeżone.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
}

.footer a {
  color: #fff;
  text-decoration: none;
}

.footer a:hover {
  color: #ffc107;
}
</style>
