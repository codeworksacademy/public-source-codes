<script setup>
import { projectsService } from '@/services/ProjectsService.js';
import Pop from '@/utils/Pop.js';
import { ref } from 'vue';


const projectData = ref({
  title: '',
  coverImg: '',
  projectImgsStr: '',
  projectImgs: []
})

function resetForm(){
  projectData.value= {
  title: '',
  coverImg: '',
  projectImgsStr: '',
  projectImgs: []
}
}

async function createProject(){
  try {
    console.log(projectData.value);
    projectData.value.projectImgs = projectData.value.projectImgsStr.split(', ')
    await projectsService.createProject(projectData.value)
    resetForm()
  } catch (error) {
    Pop.toast("Could not create Project", 'error')
    console.error(error);

  }
}

</script>


<template>
<form @submit.prevent="createProject()" class="row my-3 bg-dark p-2 rounded border">
  <div class="col-12">
    <h3 class="text-info">Create New Project</h3>
  </div>
  <div class="mb-2 col-6">
    <label for="project-title">Title</label>
    <input v-model="projectData.title" type="text" minlength="3" maxlength="25" required class="form-control" id="project-title" name="project-title">
  </div>
  <div class="mb-2 col-6">
    <label for="project-cover-image">Cover Image</label>
    <input v-model="projectData.coverImg" type="text" minlength="3" maxlength="255" required class="form-control" id="project-cover-image" name="project-cover-image">
  </div>
  <div class="mb-2 col-12">
    <label for="project-cover-image">Project Images</label>
    <textarea v-model="projectData.projectImgsStr" name="" id="" class="form-control"></textarea>
    <small class="text-secondary">comma + space separated</small>
  </div>
  <div class="mb-2 text-end">
    <button @click="resetForm()" type="button" class="btn  me-5">reset </button>
    <button class="btn btn-info px-4">Create <i class="mdi mdi-plus-thick"></i></button>
  </div>
</form>
</template>


<style lang="scss" scoped>

</style>
