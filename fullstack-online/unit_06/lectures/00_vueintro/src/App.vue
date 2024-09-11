<script setup>
import { ref } from 'vue';
import Tiger from './components/Tiger.vue';


console.log("hello from the vue js");
let counter = ref(0)

function counterIncrease(){
  counter.value++
  console.log(counter.value)
}

let animals = ['🐅', '🦧', '🐘']

</script>

<template>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <section>
      <h1>This is cool</h1>
      <article>
        Vue is so cool i think it's my new favorite
        <button @click="counterIncrease()">Count</button>
        <div>Count {{ counter }}</div>

        <div v-if="counter > 20">You win!</div>
        <div v-else>Keep going</div>

        <div>
          <span v-for="number in counter">{{ number }} 🐅</span>
        </div>

        <h1 v-for="animal in animals">
          {{ animal }}
        </h1>

      </article>
      <Tiger v-if="counter > 5"/>
    </section>

</template>

<style scoped>

article{
  /* background-color: blue; */
  color: rgb(222, 186, 255);
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

</style>
