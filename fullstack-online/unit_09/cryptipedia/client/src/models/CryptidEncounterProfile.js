import { Profile } from "./Account.js";

export class CryptidEncounterProfile extends Profile {
  constructor(data) {
    super(data)
    this.cryptidEncounterId = data.cryptidEncounterId
    this.encounteredAt = new Date(data.encounteredAt)
  }
}