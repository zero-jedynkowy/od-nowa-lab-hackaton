<script setup>
    const model = defineModel()
</script>


<template>
    <div class="marketItem card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <div class="logo-column">
                    <img v-if="model.logo" :src="model.logo" :alt="`Logo ${model.name}`" class="logo-image">
                    <span v-else class="logo-placeholder">Brak logo</span>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ model.name }}</h5>
                    <p class="card-text mb-1"><strong>Autor:</strong> {{ model.user?.name || model.user?.email || 'Nieznany' }}</p>
                    <p class="card-text mb-2"><strong>Kategoria:</strong> {{ model.category }}</p>
                    <p class="card-text description-truncate">{{ model.description }}</p>
                    <p class="card-text"><small class="text-body-secondary">{{ new Date(model.createdAt).toLocaleString('pl-PL') }}</small></p>
                    <p class="d-inline-flex gap-1">
                        <NuxtLink :to="`/market/${model.id}`" class="myBtn bi bi-tags btn btn-success">Szczegóły</NuxtLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css">
    .marketItem
    {
        width: 100%;
    }

    .logo-column {
        min-height: 220px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
    }

    .logo-image {
        width: 100%;
        height: 220px;
        object-fit: contain;
        padding: 1rem;
    }

    .logo-placeholder {
        color: #6c757d;
    }

    .description-truncate
    {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
</style>