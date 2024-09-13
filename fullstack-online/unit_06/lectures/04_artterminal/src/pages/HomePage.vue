<script setup>
import { AppState } from '@/AppState.js';
import ProjectCard from '@/components/ProjectCard.vue';
import { projectsService } from '@/services/ProjectsService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const projects = computed(()=> AppState.projects)

onMounted(()=>{
  getAllProjects()
})


async function getAllProjects(){
  try {
    await projectsService.getAllProjects()
  } catch (error) {
    Pop.toast("Could not get projects", 'error')
    console.error(error)
  }
}

</script>

<template>
  <div class="container">
    <section class="row g-3 my-4">
      <div class="col-12">
        <p class="fs-4">
          Community Projects
        </p>
        <hr>
      </div>
      <!-- {{ projects }} -->
      <div v-for="project in projects" :key="project.id" class="col-md-6">
        <!-- {{ project.title }} -->
          <ProjectCard :project="project"/>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
