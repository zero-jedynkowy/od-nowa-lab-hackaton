<script setup lang="ts">
const { toast, hideToast } = useToast()
</script>

<template>
  <div
    class="toast-container position-fixed bottom-0 end-0 p-3"
    aria-live="assertive"
    aria-atomic="true"
  >
    <Transition name="toast-slide" mode="out-in">
      <div v-if="toast" :key="`${toast.variant}-${toast.message}`" class="toast show text-white border-0" :class="`text-bg-${toast.variant}`" role="alert">
        <div class="d-flex">
          <div class="toast-body">{{ toast.message }}</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            aria-label="Zamknij"
            @click="hideToast"
          ></button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.toast-container {
  z-index: 1100;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>