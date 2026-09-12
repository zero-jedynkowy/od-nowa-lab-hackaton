<template>
  <footer class="footer bg-dark text-white mt-5">
    <div class="container-fluid py-5">

      <div class="row text-center">
        <div class="col-md-3 mb-4">
          <h5>O nas</h5>
          <p>Wołomin - Miasto przyszłości</p>
          <p>Pozdrawiam z rodzinka</p>
        </div>
        <div class="col-md-3 mb-4">
          <h5>Szybkie linki</h5>
          <ul class="list-unstyled">
            <li><NuxtLink to="/">Strona główna</NuxtLink></li>
            <li><NuxtLink to="/market/listings">Ryneczek</NuxtLink></li>
            <li><NuxtLink to="/city/design">Miasto 2.0</NuxtLink></li>
            <li><NuxtLink to="/city/active">Aktywne Miasto</NuxtLink></li>
          </ul>
        </div>
        <div class="col-md-3 mb-4">
          <h5>Kontakt</h5>
          <p>Email: kontakt@wolomin.pl</p>
          <p>Tel: +48 22 XXX XX XX</p>

          <div class="social-icons">
            <a href="https://facebook.com/wolomin" target="_blank" class="social-link" title="Facebook">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="https://instagram.com/wolomin" target="_blank" class="social-link" title="Instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="https://linkedin.com/company/wolomin" target="_blank" class="social-link" title="LinkedIn">
              <i class="bi bi-linkedin"></i>
            </a>
            <a href="https://twitter.com/wolomin" target="_blank" class="social-link" title="Twitter">
              <i class="bi bi-twitter"></i>
            </a>
          </div>
        </div>
        <div class="col-md-3 mb-4">
          <h5>Regulamin strony</h5>
          <p><NuxtLink to="/terms">Regulamin strony</NuxtLink></p>
        </div>
    </div>
      <hr class="bg-secondary">
      <div class="text-center">
        <p>&copy; 2026 Wołomin. Wszystkie prawa zastrzeżone.</p>
        <p>Projekt zostal stworzony w ramach wydarzenia "Hakaton - OdNowa Lab"</p>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.footer {
  margin-top: auto;
  background-color: #212529 !important;
  color: #fff !important;
}

.footer a {
  color: #fff !important;
  text-decoration: none;
}

.footer a:hover {
  color: #ffc107;
}
</style>
