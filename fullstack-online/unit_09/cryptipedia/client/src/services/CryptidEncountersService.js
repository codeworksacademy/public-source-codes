import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { CryptidEncounterProfile } from "@/models/CryptidEncounterProfile.js"

class CryptidEncountersService {
  async deleteCryptidEncounter(cryptidEncounterId) {
    const response = await api.delete(`api/cryptidEncounters/${cryptidEncounterId}`)
    logger.log('DELETED', response.data)

    const index = AppState.cryptidEncounterProfiles.findIndex(profile => profile.cryptidEncounterId == cryptidEncounterId)

    AppState.cryptidEncounterProfiles.splice(index, 1)
  }
  async createCryptidEncounter(encounterData) {
    const response = await api.post('api/cryptidEncounters', encounterData)
    logger.log('CREATED ENCOUNTER', response.data)
    AppState.cryptidEncounterProfiles.push(new CryptidEncounterProfile(response.data))
  }
  async getCryptidEncounterProfilesByCryptidId(cryptidId) {
    AppState.cryptidEncounterProfiles.length = 0
    const response = await api.get(`api/cryptids/${cryptidId}/cryptidEncounters`)
    logger.log('GOT ENCOUNTERS', response.data)
    AppState.cryptidEncounterProfiles = response.data.map(pojo => new CryptidEncounterProfile(pojo))
  }
}

export const cryptidEncountersService = new CryptidEncountersService()