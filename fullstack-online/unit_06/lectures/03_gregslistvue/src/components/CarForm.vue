<script setup>
import { carsService } from '@/services/CarsService.js';
import Pop from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { ref } from 'vue';

// const carMake = ref('')
const formData = ref({
  make: '',
  model: '',
  year: null,
  color: '#f0f0f0',
  engineType: '',
  imgUrl: '',
  price: null
})
const selectableEngines = ['4 cylinder', 'v6', 'v8', 'large', 'small', '2 stroke']

async function createCar(){
  try {
    await carsService.createCar(formData.value)
    Modal.getOrCreateInstance('#car-form').hide()
    resetForm()
  } catch (error) {
    Pop.toast('Could not create car', 'error')
    console.error(error)
  }
}

function resetForm(){
  formData.value = {
  make: '',
  model: '',
  year: null,
  color: '#f0f0f0',
  engineType: '',
  imgUrl: '',
  price: null
}
}

</script>


<template>
<form @submit.prevent="createCar()" class="row">
  <div class="mb-2 col-6 col-md-3">
    <label for="car-make">Make</label>
    <input v-model="formData.make" class="form-control" type="text" minlength="3" maxlength="25" required id="car-make" name="make">
  </div>
  <div class="mb-2 col-6 col-md-3">
    <label for="car-model">Model</label>
    <input v-model="formData.model" class="form-control" type="text" minlength="3" maxlength="25" required id="car-model" name="model">
  </div>
  <div class="mb-2 col-6 col-md-3">
    <label for="car-year">Year</label>
    <input v-model="formData.year" class="form-control" type="number" min="1997" max="2025" required id="car-year" name="year">
  </div>
  <div class="mb-2 col-6 col-md-3">
    <label for="car-color">Color</label>
    <input v-model="formData.color" class="form-control " type="color" required id="car-color" name="color">
  </div>
  <div class="mb-2 col-6 col-md-2">
    <label for="car-engine">Engine Type</label>
    <select v-model="formData.engineType" class="form-control" name="engine" id="car-engine">
      <option v-for="engine in selectableEngines" :key="engine" :value="engine">{{engine}}</option>
    </select>
  </div>
  <div class="mb-2 col-12 col-md-4">
    <label for="car-image">Image</label>
    <input v-model="formData.imgUrl" class="form-control " type="url" required id="car-image" name="image">
  </div>
  <div class="mb-2 col-12 col-md-4">
    <label for="car-image">Preview</label>
    <div class="form-control bg-transparent p-1">
      <img class="img-preview border rounded" :src="formData.imgUrl" alt="">
    </div>
  </div>
  <div class="mb-2 col-6 col-md-2">
    <label for="car-price">Price</label>
    <input v-model="formData.price" class="form-control" type="number" min="0" max="100000000000" required id="car-price" name="price">
  </div>
  <div class="col-12 text-end">
    <button class="btn btn-primary px-3">Submit <i class="mdi mdi-plus"></i></button>
  </div>

</form>
</template>


<style lang="scss" scoped>
.img-preview{
  max-height: 10em;
  width: 100%;
  object-fit: contain;
  background-color: rgb(231, 231, 231);
}
</style>
