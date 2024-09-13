<script setup>
import { AppState } from '@/AppState.js';
import ProjectCard from '@/components/ProjectCard.vue';
import ProjectForm from '@/components/ProjectForm.vue';
import { profilesService } from '@/services/ProfilesService.js';
import { projectsService } from '@/services/ProjectsService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const profile = computed(()=> AppState.activeProfile)
const account = computed(()=> AppState.account)
const projects = computed(()=> AppState.profileProjects)

onMounted(()=>{
  console.log('mounting');
  getProfileById()
  getProjectsByProfileId()
})

watch(route, ()=>{
  console.log('watch changed');
  getProfileById()
  getProjectsByProfileId()
})

async function getProfileById(){
  try {
    await profilesService.getProfileById(route.params.profileId)
  } catch (error) {
    Pop.toast("Could not get profile", 'error')
    console.error(error);

  }
}

async function getProjectsByProfileId(){
  try {
    await projectsService.getProjectsByProfileId(route.params.profileId)
  } catch (error) {
    Pop.toast("Could not get profile projects", 'error')
    console.error(error);
  }
}

</script>


<template>
  <div class="container">


    <section v-if="profile" class="row justify-content-center mt-4 mb-2">
      <div class="col-md-8 text-center">
        <img class="profile-cover" :src="profile.coverImg" alt="">
        <img class="profile-img" :src="profile.picture" alt="">
        <h1 class="text-over-img">{{ profile.name }}</h1>
        <div class="card bg-dark">
          <div class="card-body text-start">
            <p class="">{{ profile.bio }}</p>
            <div class="d-flex justify-content-between">
              <div class="fw-bold text-secondary">joined {{ profile.joinedDate }}</div>
              <div>
                <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank"><i class="mdi mdi-linkedin fs-4"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      <ProjectForm v-if="profile?.id == account?.id && account"/>

    <section class="row g-4">
      <div class="col-12">
        Profile projects
      </div>
      <div v-for="project in projects" :key="project.id" class="col-12">
        <!-- {{ project.title }} -->
          <ProjectCard :project="project"/>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.profile-cover{
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
  margin-bottom: -150px;
  border-radius: 12px;
}
.profile-img{
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
  border-radius: 50px;
}
.text-over-img{
  text-shadow: 0px 2px 3px black;
}
</style>
