<script setup>
import { AppState } from '@/AppState.js';
import CryptidCard from '@/components/CryptidCard.vue';
import { cryptidsService } from '@/services/CryptidsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const cryptids = computed(() => AppState.cryptids)


onMounted(() => {
  getCryptids()
})


async function getCryptids() {
  try {
    await cryptidsService.getCryptids()
  } catch (error) {
    Pop.error(error, 'Could not get cryptids')
    logger.error('COULD NOT GET CRYPTIDS', error)
  }
}

</script>

<template>
  <section class="container-fluid forest-bg">
    <div class="row shadow-bg">
      <div class="col-md-8">
        <div class="p-5 text-light">
          <h2 class="italiana-font">Terrestrials</h2>
          <p>
            A terrestrial cryptid is a creature that exists on land but has not been “scientifically” proven. These
            creatures often stem from folklore, mythology, or anecdotal evidence. Unlike aquatic cryptids, like the Loch
            Ness Monster, terrestrial cryptids inhabit forests, mountains, or other land-based environments.
          </p>
        </div>
      </div>
      <div class="col-md-4 pe-0">
        <div class="d-flex align-items-end justify-content-end h-100">
          <img src="@/assets/img/blue-cat.png" alt="Blue cat" class="img-fluid">
        </div>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="italiana-font text-light my-4">CRYPTIDS</h1>
      </div>
    </div>
    <div class="row">
      <div v-for="cryptid in cryptids" :key="'cryptidCard ' + cryptid.id" class="col-md-3 px-0">
        <CryptidCard :cryptid="cryptid" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.forest-bg {
  background-image: url(https://images.unsplash.com/photo-1446104838475-bc6508184f08?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  background-size: cover;
}

.shadow-bg {
  background: #F8F9FA;
  background: linear-gradient(0deg, rgba(248, 249, 250, 0.54) 3%, rgba(19, 17, 20, 1) 89%);
  ;
  backdrop-filter: sepia(20%);
}
</style>
