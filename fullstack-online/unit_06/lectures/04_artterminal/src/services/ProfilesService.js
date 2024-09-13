import { AppState } from "@/AppState.js";
import { api } from "./AxiosService.js"
import { Profile } from "@/models/Profile.js";



class ProfilesService {
  async getProfileById(profileId) {
    AppState.activeProfile = null
    const response = await api.get(`api/profiles/${profileId}`)
    console.log('🧑‍🦲📡', response.data);
    AppState.activeProfile = new Profile(response.data)
  }

}

export const profilesService = new ProfilesService()
