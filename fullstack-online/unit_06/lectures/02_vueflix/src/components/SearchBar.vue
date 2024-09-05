<script setup>
import { AppState } from '@/AppState.js';
import { moviesService } from '@/services/MoviesService.js';
import Pop from '@/utils/Pop.js';
import { computed, ref } from 'vue';

const searchTerm = ref('')
const currentSearch = computed(()=> AppState.currentSearch)

async function searchMovies(){
  try {
    console.log(searchTerm.value);
    await moviesService.searchMovies(searchTerm.value)
    searchTerm.value = ''
  } catch (error) {
    Pop.toast(`Could not complete Search for ${searchTerm.value}`, 'error')
    console.error(error)
  }
}

  async function clearSearch(){
    try {
        await moviesService.discoverMovies()
    } catch (error) {
      Pop.toast(`Could not rediscover movies`, 'error')
      console.error(error)
    }
  }



</script>


<template>
<section class="row mt-4">
  <label for="search-bar">Search Movies</label>
  <form @submit.prevent="searchMovies()" class="input-group col-12 p-0">
    <input v-model="searchTerm" id="search-bar" type="text" class="form-control">
    <button class="btn btn-primary px-5"><i class="mdi mdi-magnify"></i></button>
  </form>
</section>
<section class="d-flex mt-1">
<span v-if="currentSearch" class="bg-info rounded-pill p-1 px-3 text-dark">{{ currentSearch }} <i class="ms-3 mdi mdi-close px-1 selectable" @click="clearSearch()"></i></span>
</section>
</template>


<style lang="scss" scoped>

</style>
