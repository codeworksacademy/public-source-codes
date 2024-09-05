<script setup>
import { AppState } from '@/AppState.js';
import MovieCard from '@/components/MovieCard.vue';
import PageButtons from '@/components/PageButtons.vue';
import SearchBar from '@/components/SearchBar.vue';
import { moviesService } from '@/services/MoviesService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const movies = computed(()=> AppState.movies)


onMounted(()=>{
 discoverMovies()
})


async function discoverMovies(){
  try {
    await moviesService.discoverMovies()
  } catch (error) {
  Pop.toast('Could not discover Movies', 'error')
  console.error(error)
  }
}


</script>

<template>
<div class="container">

<SearchBar/>

<PageButtons/>
<section class="row my-3 g-2">
  <div v-for="movie in movies" :key="movie.id" class="col-md-3">
    <!-- <div class="card">
      🎞️{{ movie.title }}
      <img class="img-fluid" :src="movie.poster" alt="">
    </div> -->
    <!-- <MovieCard :movieTitle="movie.title"/> -->
    <MovieCard :movie="movie"/>
  </div>
</section>
<PageButtons/>

</div>
</template>

<style scoped lang="scss">

</style>
