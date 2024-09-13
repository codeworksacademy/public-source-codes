<script setup>
import { AppState } from '@/AppState.js';
import { gamesService } from '@/services/GameService.js';
import { computed } from 'vue';

  const heroes = computed(()=> AppState.heroes)


  function attackBoss(heroName){
    console.log(heroName, 'attacking');
    gamesService.attackBoss(heroName)
  }

  function revive(heroName){
    gamesService.revive(heroName)
  }


</script>


<template>
  <section class="row align-items-end">
    <div v-for="hero in heroes" :key="hero.name" class="col-4">
      <div class="card">
        <button @click="attackBoss(hero.name)" class="btn btn-outline-info" v-if="hero.health > 0" >Attack with {{ hero.type }}</button>

        <button @click="revive(hero.name)" v-else :disabled="AppState.gold < 100" class="btn btn-outline-warning">Revive 100g</button>

        <img class="hero-img" :class="{dead: hero.health <= 0}"  :src="hero.picture" alt="">
        <div class="card-body text-center p-1">
          <h5 class="py-0">{{ hero.name }} <span class="text-primary">lv.{{ hero.level }}</span></h5>
          <div class="progress">
            <div class="progress-bar" :style="{width: `${hero.healthPercent}%`}">{{ hero.health }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
<!-- <div>{{ heroes }}</div> -->
</template>


<style lang="scss" scoped>
.hero-img{
  height: 150px;
  width: 150px;
  object-fit: contain;
  object-position: center;
  margin-inline: auto
}

.dead{
  transition: all .5s ease;
  filter: saturate(0) brightness(0) drop-shadow(0 0 2px white);
}
</style>
