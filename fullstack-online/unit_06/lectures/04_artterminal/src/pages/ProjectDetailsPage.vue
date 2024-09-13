<script setup>
import { AppState } from '@/AppState.js';
import { projectsService } from '@/services/ProjectsService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const project = computed(()=> AppState.activeProject)

onMounted(()=>{
  getProjectById()
})

async function getProjectById(){
  try {
    await projectsService.getProjectById(route.params.projectId)
  } catch (error) {
    Pop.toast("Could not get project by id", 'error')
    console.error(error);

  }
}

</script>


<template>
<div class="container-fluid">
  <section class="row my-4">

    <div class="col-md-9">
      <div v-if="project" class="columns">
        <img v-for="image in project.projectImgs" :key="image" :src="image" alt="">
      </div>

      <!-- SECTION skeleton loading -->
      <div v-else class="columns">
        <div v-for="num in 4" class="skeleton-block" :key="num"></div>
      </div>
    </div>


    <div class="col-md-3 border-start">
      <div v-if="project" class="sticky-top">
        <img class="project-cover rounded shadow" :src="project.coverImg" alt="">
        <div class="d-flex justify-content-center">
          <span class="bg-dark p-2 border rounded">{{ project.title }}</span>
        </div>
        <div class="d-flex align-items-center mt-3">
          <img class="creator-img me-1" :src="project.creator.picture" alt="">
          <span class="fw-bold">{{ project.creator.name }}</span>
        </div>
        <div class="my-3">
          <RouterLink :to="{name: 'Profile', params: {profileId: project.creatorId}}" class=" w-100 btn btn-outline-info">Go to {{ project.creator.name }}'s profile <i class="mdi mdi-arrow-right"></i></RouterLink>
        </div>
      </div>

      <!-- SECTION skeleton loading -->
      <div v-else>
        <div class="skeleton project-cover rounded shadow"  alt=""></div>
        <div class="d-flex justify-content-center">
          <span class="bg-dark p-2 border rounded">...</span>
        </div>
        <div class="d-flex align-items-center mt-3">
          <div class="skeleton creator-img me-1" alt=""></div>
          <span class="fw-bold">...</span>
        </div>
      </div>
    </div>


  </section>
</div>
</template>


<style lang="scss" scoped>
.project-cover{
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: -50px;
}

.creator-img{
  height: 75px;
  width: 75px;
  border-radius: 50em;
}

.columns{
  columns: 350px;
  column-gap: 5px;

  img{
    width: 100%;
    margin-bottom: 5px;
  }
}

.skeleton{
  background-color: rgba(128, 128, 128, 0.253);
}

.skeleton-block{
  width: 100%;
  margin-bottom: 5px;
  background-color: rgba(128, 128, 128, 0.253);
  min-height: 500px;
}


</style>
