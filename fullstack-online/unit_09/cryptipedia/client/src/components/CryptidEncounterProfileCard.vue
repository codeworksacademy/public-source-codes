<script setup>
import { AppState } from '@/AppState.js';
import { CryptidEncounterProfile } from '@/models/CryptidEncounterProfile.js';
import { cryptidEncountersService } from '@/services/CryptidEncountersService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

const props = defineProps({
  profile: { type: CryptidEncounterProfile, required: true }
})

const account = computed(() => AppState.account)


async function deleteCryptidEncounter() {
  const confirmed = await Pop.confirm(`Are you sure you did not encounter the ${AppState.activeCryptid.name} on ${props.profile.encounteredAt.toLocaleString()}?`)

  if (!confirmed) {
    return
  }

  try {
    await cryptidEncountersService.deleteCryptidEncounter(props.profile.cryptidEncounterId)
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}
</script>


<template>
  <div class="mb-3 d-flex gap-3">
    <img :src="profile.picture" :alt="'a picture of ' + profile.name">
    <div>
      <div class="d-flex justify-content-between">
        <p>{{ profile.name }}</p>
        <button v-if="profile.id == account?.id" @click="deleteCryptidEncounter()" type="button"
          class="btn btn-outline-danger" title="Delete cryptid encounter">
          <span class="mdi mdi-close"></span>
        </button>
      </div>
      <time :datetime="profile.encounteredAt.toUTCString()">
        {{ profile.encounteredAt.toLocaleString('en-us', {
          dayPeriod: 'long', weekday: 'long', day: '2-digit', year:
            'numeric', month: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit'
        }) }}
      </time>
    </div>
  </div>
</template>


<style lang="scss" scoped>
img {
  height: 4rem;
  aspect-ratio: 1/1;
  object-fit: cover;
}
</style>