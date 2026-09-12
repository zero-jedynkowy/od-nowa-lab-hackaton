<script setup>
    import { defineModel } from 'vue';

    const model = defineModel({
        type: Object,
        default: () => ({
            name: '',
            phone: '',
            email: '',
            description: '',
            category: 0
        })
    })

</script>


<template>
    <form>

        <div class="mb-3">
            <h1>Dodaj ogłoszenie</h1>
        </div>

        <div class="mb-3">
            <label for="name" class="form-label">Nazwa ogłoszenia</label>
            <input type="text" class="form-control" id="name" aria-describedby="nazwa" v-model="model.name" placeholder="Wpisz nazwę ogłoszenia">
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Opis</label>
            <textarea class="form-control description-field" placeholder="Wpisz opis ogłoszenia" id="description" v-model="model.description"></textarea>
        </div>

        <div class="mb-3">
            <label for="category" class="form-label">Kategoria</label>
            <select class="form-select" aria-label="Default select example" id="category" v-model="model.category">
                <option selected value="0">Wybierz kategorię</option>
                <option value="1">Gastronomia</option>
                <option value="2">Rzemiosło</option>
                <option value="3">Usługi</option>
                <option value="4">Inne</option>
            </select>
        </div>


        <div class="mb-3">
            <label for="phone" class="form-label">Telefon</label>
            <input type="text" class="form-control" id="phone" aria-describedby="telefon" v-model="model.phone" placeholder="Wpisz numer telefonu">
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="model.email" placeholder="Wpisz adres e-mail">
        </div>

        <div class="mb-3">
            <label for="formFileMultiple" class="form-label">Logo</label>
            <input class="form-control" type="file" id="formFileMultiple" multiple>
        </div>

        <div class="mb-3">
            <label for="formFileMultiple" class="form-label">Baner</label>
            <input class="form-control" type="file" id="formFileMultiple" multiple>
        </div>

        <div class="mb-3">
            <label for="formFileMultiple" class="form-label">Zdjęcia</label>
            <input class="form-control" type="file" id="formFileMultiple" multiple>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<style scoped>
    .description-field 
    {
        resize: none;
        height: 200px;
    }
</style>