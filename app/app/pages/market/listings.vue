<script setup>
    const example = ref({uuid: '125f8ec3-5699-46b1-aacf-985223214f54', title: 'An example item',
    description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta dui elit, at maximus metus suscipit a. Nunc sollicitudin nunc non tempus vehicula. Quisque suscipit quam sed dignissim tempus. Vivamus eu porta magna, nec malesuada neque. Cras posuere quam sed ex sodales suscipit. Nullam aliquet fermentum velit et semper. Pellentesque feugiat, purus in aliquam egestas, eros tortor blandit orci, a finibus tellus arcu vitae justo. Aenean eleifend, lorem vitae auctor congue, tellus sem finibus mi, aliquam dignissim mi nunc quis nunc. Praesent molestie molestie metus, id pellentesque ante egestas sit amet. Aliquam pulvinar velit a nunc volutpat bibendum. Aliquam egestas nisi dolor, eget cursus odio tempor vel. Donec laoreet tellus et orci lacinia, in dictum leo molestie. ',
    createdAt: '11-09-2001, 11:33:00'
})



</script>


<template>
<MarketItem v-model="example"></MarketItem>
<MarketItem v-model="example"></MarketItem>
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
