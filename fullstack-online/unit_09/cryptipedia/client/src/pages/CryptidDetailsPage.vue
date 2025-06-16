<script setup>
import { AppState } from '@/AppState.js';
import CryptidEncounterProfileCard from '@/components/CryptidEncounterProfileCard.vue';
import { cryptidEncountersService } from '@/services/CryptidEncountersService.js';
import { cryptidsService } from '@/services/CryptidsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const cryptid = computed(() => AppState.activeCryptid)
const profiles = computed(() => AppState.cryptidEncounterProfiles)
const account = computed(() => AppState.account)
const route = useRoute()

onMounted(() => {
  getCryptidById()
  getCryptidEncounterProfilesByCryptidId()
})

async function getCryptidById() {
  try {
    await cryptidsService.getCryptidById(route.params.cryptidId)
  } catch (error) {
    Pop.error(error, 'Could not get cryptid')
    logger.error('Could not get cryptid', error)
  }
}

async function getCryptidEncounterProfilesByCryptidId() {
  try {
    await cryptidEncountersService.getCryptidEncounterProfilesByCryptidId(route.params.cryptidId)
  } catch (error) {
    Pop.error(error, 'Could not get cryptid encounters')
    logger.error('Could not get cryptid encounters', error)
  }
}

async function createCryptidEncounter() {
  try {
    const encounterData = { cryptidId: route.params.cryptidId }
    await cryptidEncountersService.createCryptidEncounter(encounterData)
  } catch (error) {
    Pop.error(error, 'Could not create cryptid encounter')
    logger.error('Could not create cryptid encounter', error)
  }
}
</script>


<template>
  <section v-if="cryptid" class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="text-light">
          <p class="text-warning fs-3 text-capitalize italiana-font">
            {{ cryptid.origin }} Cryptid
          </p>
          <h1 class="italiana-font">{{ cryptid.name }}</h1>
          <p>{{ cryptid.description }}</p>
          <div>
            <h2 class="italiana-font">Size</h2>
            <div class="fs-2 stats" :title="`The size of the ${cryptid.name} is ${cryptid.size}/10`">
              <span v-for="num in cryptid.size" :key="'cryptidSize ' + num" class="mdi mdi-circle"></span>
              <span v-for="num in (10 - cryptid.size)" :key="'cryptidEmptySize ' + num"
                class="mdi mdi-circle-outline"></span>
            </div>
          </div>
          <div>
            <h2 class="italiana-font">Threat Level</h2>
            <div class="fs-2 stats" :title="`The threat level of the ${cryptid.name} is ${cryptid.threatLevel}/10`">
              <span v-for="num in cryptid.threatLevel" :key="'cryptidThreatLevel ' + num" class="mdi mdi-circle"></span>
              <span v-for="num in (10 - cryptid.threatLevel)" :key="'cryptidEmptyThreatLevel ' + num"
                class="mdi mdi-circle-outline"></span>
            </div>
          </div>
          <div class="mt-3">
            <h2 class="text-warning italiana-font">
              Encountered by {{ profiles.length }} human<span v-if="profiles.length != 1">s</span>
            </h2>
            <div v-if="account" class="mb-3">
              <button @click="createCryptidEncounter()" type="button" class="btn btn-outline-warning">
                I've encountered the {{ cryptid.name }}
              </button>
            </div>
            <div v-for="profile in profiles" :key="'human ' + profile.id">
              <CryptidEncounterProfileCard :profile="profile" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <img :src="cryptid.imgUrl" :alt="`A blurry picture of the ${cryptid.name}`" class="img-fluid">
      </div>
    </div>
  </section>
  <section v-else class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1 class="italiana-font">Loading... <span class="mdi mdi-loading mdi-spin"></span></h1>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.stats {
  width: fit-content;
}
</style>