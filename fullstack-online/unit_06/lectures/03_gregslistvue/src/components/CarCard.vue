<script setup>
import { AppState } from '@/AppState.js';
import { Car } from '@/models/Car.js';
import { carsService } from '@/services/CarsService.js';
import Pop from '@/utils/Pop.js';
import { computed } from 'vue';

const user = computed(()=> AppState.account)

const props = defineProps({car: {type: Car, required: true}})

async function deleteCar(){
  try {
    const confirm = await Pop.confirm(`Are you sure you want to un-list the ${props.car.year} ${props.car.make}`, 'This cannot be undone', 'yes', 'question')
    if(!confirm) return

    await carsService.deleteCar(props.car.id)
  } catch (error) {
    Pop.toast(`Could not delete ${props.car.make}`, 'error')
    console.error(error)
  }
}

</script>


<template>
<div class="card shadow-sm position-relative">
  <img :src="car.imgUrl" class="card-img" alt="">
  <div class="card-body">
    <h5 class="card-title">{{ car.make }} {{ car.model }} {{car.year}}</h5>
    <p><span class="color-bubble"></span> {{ car.engineType }} </p>
    <div class="text-end fw-bold mt-1">
      <span><i class="mdi mdi-currency-usd"></i>{{ car.priceFormat }}</span>
    </div>
  </div>
  <button type="button" @click="deleteCar()" v-if="car.creatorId == user?.id" class="btn btn-danger position-absolute top-0">Un-list</button>
</div>
</template>


<style lang="scss" scoped>
.card-img{
  height: 13rem;
  object-fit: contain;
  object-position: center;
  background-color: rgb(219, 219, 219);
}

.color-bubble{
  display: inline-block;
  background-color: v-bind('car.color');
  height: 1.25em;
  width: 1.25em;
  border-radius: 5em;
  box-shadow: 0 0 3px black;
}

.btn-danger{
  opacity: 0;
  pointer-events: none;
}

.card:hover .btn-danger{
opacity: 1;
pointer-events: all;
transition: opacity .3s .3s ease;
}
</style>
