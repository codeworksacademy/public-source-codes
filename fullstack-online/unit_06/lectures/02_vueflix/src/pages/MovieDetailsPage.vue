<script setup>
import { AppState } from '@/AppState.js';
import { moviesService } from '@/services/MoviesService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const movie = computed(()=> AppState.activeMovie)

const route = useRoute()

onMounted(()=>{
  getMovieDetailsById()
})

async function getMovieDetailsById(){
  try {
    await moviesService.getMovieDetailsById(route.params.movieId)
  } catch (error) {
    Pop.toast("Could not retrieve movie details", 'error')
    console.error(error);

  }
}

</script>


<template>
<div class="container">
  <section v-if="movie" class="row my-4">
      <img class="hero-img" :src="movie.backdrop" alt="">
      <div class="col-12 px-4 text-shadow">
        <h1>{{ movie.title }}</h1>
      </div>
      <div class="d-flex mt-2  align-items-baseline justify-content-between">
        <div>
          <h4>{{ movie.tagline }}</h4>
          <div>
            <span class="me-2 border-info bg-black px-3 rounded-pill text-info-emphasis" v-for="genre in movie.genres" :key="genre">{{ genre.name }}</span>
          </div>
          <div class="d-flex">
            <div v-for="studio in movie.productionCompanies" :key="studio" :title="studio.name" class="studio-logo me-2 p-1 rounded ">
              <img  :src="`https://media.themoviedb.org/t/p/original${studio.logo_path}`" alt="">
            </div>
          </div>
        </div>
        <div class="fw-bold text-end">
          <div title="run time">
            {{ movie.runtime }}m <i class="mdi mdi-clock"></i>
          </div>
          <div title="average review">
            {{ movie.reviewScore }} <i class="mdi mdi-star"></i>
          </div>
          <div title="revenue">
            {{  movie.revenueFormat }} <i class="mdi mdi-cash"></i>
          </div>
          <div title="budget">
            {{movie.budgetFormat}} <i class="mdi mdi-currency-usd"></i>
          </div>
          <div title="Estimated Profits" :class="{'text-info': movie.revenue > movie.budget, 'text-danger': movie.revenue < movie.budget}">
            {{movie.estimatedProfits}} <i class="mdi mdi-currency-usd"></i>
          </div>
        </div>

      </div>
        <div class="my-4 d-flex align-items-center border p-2 rounded" >
          <img class="poster me-4" :src="movie.poster" alt="">
          <p class="">{{ movie.overview }}</p>
        </div>
        <a class="text-info" :href="movie.homepage" target="_blank">{{ movie.homepage }}</a>
  </section>
  <section v-else>
    <h1 class="text-center text-info">Loading</h1>
  </section>
</div>
</template>


<style lang="scss" scoped>
.hero-img{
  height: 50vh;
  object-fit: cover;
  margin-bottom: -3.5em;
}
.text-shadow{
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.76);
}

.poster{
  height: 15em;
  border-radius: 8px;
}

.studio-logo{
  background-color: var(--bs-info);
  img{
    height: 2.5em;
  }
}
</style>
