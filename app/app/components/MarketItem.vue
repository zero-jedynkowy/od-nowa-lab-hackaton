<script setup>
    const model = defineModel()
</script>


<template>
    <div class="marketItem card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIgC60W2hgcwFvfBw9tRqyMW7cFxKt3ZaVgR3sepdejg&s=10" class="img-fluid rounded-start w-100 h-100 object-fit-cover" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ model.title }}</h5>
                    <p class="card-text description-truncate">{{ model.description }}</p>
                    <p class="card-text"><small class="text-body-secondary">{{ model.createdAt }}</small></p>
                    <p class="d-inline-flex gap-1">
                        <button type="button" class="myBtn bi bi-tags btn btn-success" data-bs-toggle="button">Szczegóły</button>
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

    .description-truncate
    {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
</style>