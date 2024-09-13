<script setup>
import { Project } from '@/models/Project.js';
import { computed } from 'vue';


const props = defineProps({project: Project})

const cardBg = computed(()=> `url(${props.project.projectImgs[0]})`)

</script>


<template>
  <RouterLink :to="{name: 'Project Details', params: {projectId: project.id}}">
  <div class="card shadow rounded-0 selectable">
    <div class="d-flex position-relative">
      <div class="w-50">
        <img class="project-cover" :src="project.coverImg" alt="">
      </div>
      <div class="w-50 project-background ">
        <div class="blur-layer p-2 d-flex align-items-center justify-content-center">
          <span class="bg-dark p-2 rounded border">
            {{ project.title }}
          </span>
        </div>
      </div>
      <span class="creator-name position-absolute bottom-0 left-0 p-1 fw-bold">by {{ project.creator.name }}</span>
    </div>
  </div>
</RouterLink>
</template>


<style lang="scss" scoped>
.project-cover{
  width: 100%;
  height: 10em;
  object-fit: cover;
  object-position: center;
}

.project-background{
  background-image: v-bind(cardBg);
  background-position: center;
  background-size: 170%;
}

.blur-layer{
  height: 100%;
  width: 100%;
  backdrop-filter: blur(10px) brightness(.7) contrast(.7);
}

.creator-name{
  text-shadow: 0px 1px 3px black;
  backdrop-filter: blur(5px) brightness(.8);
}
</style>
