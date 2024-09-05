<script setup>
import { Movie } from '@/models/Movie.js';


// defineProps({movieTitle: String})
defineProps({movie: Movie})

</script>


<template>
  <router-link :to="{name: 'Movie Details', params: {movieId: movie.id}}" class="card">
    <img :src="movie.poster" class="card-img-top" alt="">
    <div class="card-body">
      <div class="fw-bold mb-1 movie-title">
        {{ movie.title }}
      </div>
      <div class="text-end">
       <i class="mdi mdi-star text-primary"></i> {{ movie.reviewScore.toFixed(1) }}
      </div>
    </div>
  </router-link>
</template>


<style lang="scss" scoped>
.movie-title{
  min-height: 3em;
}
</style>
