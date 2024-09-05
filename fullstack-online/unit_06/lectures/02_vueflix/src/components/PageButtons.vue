<script setup>
import { AppState } from '@/AppState.js';
import { moviesService } from '@/services/MoviesService.js';
import Pop from '@/utils/Pop.js';
import { computed } from 'vue';

const currentPage = computed(()=> AppState.currentPage)
const totalPages = computed(()=> AppState.totalPages)
const currentSearch = computed(()=> AppState.currentSearch)

async function changePage(pageNumber){
  try {
    if(currentSearch.value){
      console.log(currentSearch.value);
      await moviesService.changeSearchPage(pageNumber, currentSearch.value)
    } else {
      await moviesService.changeDiscoverPage(pageNumber)
    }
  } catch (error) {
    Pop.toast(`Could not get page ${pageNumber}`, 'error')
    console.error(error)
  }
}
</script>


<template>
  <section class="row mt-4 align-items-center">
    <button :disabled="currentPage == 1" @click="changePage(currentPage -1)" class="col-4 btn btn-outline-primary">
      <i class="mdi mdi-arrow-left"></i> previous
    </button>
    <div class="col-4 text-center">
      page {{ currentPage }} of {{ totalPages }}
      <!-- <span>{{ currentSearch }}</span> -->
    </div>
    <button :disabled="currentPage == totalPages" @click="changePage(currentPage + 1)"
      class="col-4 btn btn-outline-primary">
      next <i class="mdi mdi-arrow-right"></i>
    </button>
  </section>
</template>


<style lang="scss" scoped>

</style>
