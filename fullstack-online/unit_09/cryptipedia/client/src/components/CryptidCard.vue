<script setup>
import { Cryptid } from '@/models/Cryptid.js';

defineProps({
  cryptid: { type: Cryptid, required: true }
})
</script>


<template>
  <RouterLink :to="{ name: 'Cryptid Details', params: { cryptidId: cryptid.id } }"
    :title="`Go to the ${cryptid.name} page`">
    <div class="cryptid-card mb-4 " :style="{ backgroundImage: `url(${cryptid.imgUrl})` }">
      <div class="text-light ibm-plex-mono-font fw-bold p-2 d-flex flex-column justify-content-between h-100">
        <div class="text-end">
          <span class="mdi mdi-ufo-outline me-2"></span>
          <span>{{ cryptid.encounterCount }}</span>
        </div>
        <div>
          <p><span v-if="cryptid.id < 10">0</span>{{ cryptid.id }}</p>
          <hr>
          <p>{{ cryptid.name }}</p>
        </div>
      </div>
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
.cryptid-card {
  background-size: cover;
  text-shadow: 1px 2px 4px black;

  >div {
    min-height: 400px;
    backdrop-filter: blur(3px);
  }
}

a {
  text-decoration: none;
  transition: text-decoration .2s ease-in-out;
}

a:hover {
  text-decoration: underline;
  text-decoration-color: var(--bs-light);
}
</style>