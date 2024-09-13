<script setup>
import { AppState } from './AppState.js';
import BossMonster from './components/BossMonster.vue';
import HeroRoster from './components/HeroRoster.vue';





</script>

<template>
  <header class="bg-dark p-1 text-center">
Boss Monster
  </header>
  <main class="container-fluid">
    <BossMonster/>
  </main>
  <footer class="container text-light">
    <HeroRoster/>
    <section class="row my-2">
      <div class="col-6">
        <i class="mdi mdi-hand-coin text-warning fw-bold">{{ AppState.gold }}g</i>
      </div>
    </section>
  </footer>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';


.boss-img{
  max-height: 400px;
  max-width: 400px;
  object-fit: contain;
  object-position: center;
}

</style>
