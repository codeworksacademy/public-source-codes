<script setup>
import { AppState } from '@/AppState.js';
import CarCard from '@/components/CarCard.vue';
import CarForm from '@/components/CarForm.vue';
import ModalWrapper from '@/components/ModalWrapper.vue';
import { carsService } from '@/services/CarsService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const cars = computed(()=> AppState.cars)


onMounted(()=>{
  getCars()
})

async function getCars(){
  try {
    await carsService.getCars()
  } catch (error) {
    Pop.toast("Could not get cars", 'error')
    console.error(error)
  }
}

</script>


<template>
<div class="container">
  <button class="btn btn-primary fab-btn rounded-pill px-3 shadow" data-bs-toggle="modal" data-bs-target="#car-form">List your car</button>

  <!-- <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-test-2">open modal 2</button> -->

  <ModalWrapper modalId="car-form">
    <h3>Create Car</h3>
   <CarForm/>
  </ModalWrapper>

  <!-- <ModalWrapper modalId="modal-test-2">
    Modal 2
  </ModalWrapper> -->


  <!-- <CarForm class="mt-4"/> -->

  <section class="row g-3 my-2">

    <article v-for="car in cars" :key="car.id" class="col-md-4">
      <!-- {{i}}{{ car.make }}{{ car.model }} -->
      <CarCard :car="car"/>
    </article>

  </section>
</div>
</template>


<style lang="scss" scoped>
.fab-btn{
  position: fixed;
  bottom: 2em;
  right: 2em;
  z-index: 1000;
}
</style>
