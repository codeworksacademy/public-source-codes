<script setup>
import { AppState } from '@/AppState.js';
import { accountService } from '@/services/AccountService.js';
import Pop from '@/utils/Pop.js';
import { computed, ref, watch } from 'vue';

const account = computed(()=> AppState.account)


const accountData = ref({
  name: '',
  coverImg: '',
  picture: '',
  bio: '',
  linkedin: ''
})

watch(account, ()=> {
  console.log(account.value);
  accountData.value.name = account.value.name
  accountData.value.coverImg = account.value.coverImg
  accountData.value.picture = account.value.picture
  accountData.value.bio = account.value.bio
  accountData.value.linkedin = account.value.linkedin
}, {immediate: true})

async function saveAccount(){
  try {
    await accountService.saveAccount(accountData.value)
  } catch (error) {
    Pop.toast("Could not save account", 'error')
    console.error(error)
  }
}

</script>


<template>
<form @submit.prevent="saveAccount()" class="row text-start">
  <div class="mb-3 col-4">
    <label for="account-name">Name</label>
    <input v-model="accountData.name" type="text" id="account-name" name="account-name" class="form-control" required>
  </div>
  <div class="mb-3 col-4">
    <label for="account-coverImg">Cover Image</label>
    <input v-model="accountData.coverImg" type="text" id="account-coverImg" name="account-coverImg" class="form-control" required>
  </div>
  <div class="mb-3 col-4">
    <label for="account-picture">Profile Picture</label>
    <input v-model="accountData.picture" type="text" id="account-picture" name="account-picture" class="form-control" required>
  </div>
  <div class="mb-3 col-12">
    <label for="account-bio">Bio</label>
    <textarea v-model="accountData.bio" name="account-bio" id="account-bio" class="form-control" rows="4" ></textarea>
  </div>
  <div class="mb-3 col-12">
    <label for="account-linkedin">linkedin profile url</label>
    <input v-model="accountData.linkedin" type="text" id="account-linkedin" name="account-linkedin" class="form-control">
  </div>
  <div class="mb-3 text-end">
    <button class="btn btn-info p-3 px-5">save</button>
  </div>
</form>
</template>


<style lang="scss" scoped>

</style>
