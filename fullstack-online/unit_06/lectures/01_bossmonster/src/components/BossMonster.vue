<script setup>
import { AppState } from '@/AppState.js';
import { gamesService } from '@/services/GameService.js';
import { computed, onMounted } from 'vue';

onMounted(()=>{
  gamesService.changeMonster()
})

const monster = computed(()=> AppState.monster)

function attackMonster(){
  AppState.monster.health--
}

</script>


<template>
    <section v-if="monster" class="row justify-content-center text-center">
      <img @click="attackMonster()" class="boss-img" :src="monster.picture" alt="">
      <h3>{{ monster.name }}</h3>
      <p><em>{{ monster.title }}</em></p>
      <div class="col-8">
        <div class="progress">
          <div class="progress-bar bg-danger" :style="`width: ${monster.healthPercent}%`">{{ monster.health }}</div>
        </div>
      </div>
    </section>
</template>


<style lang="scss" scoped>

</style>
