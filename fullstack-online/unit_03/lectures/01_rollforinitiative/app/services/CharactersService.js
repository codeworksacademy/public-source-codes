import { AppState } from "../AppState.js";



class CharactersService {
  healCharacter(characterName) {
    console.log('🩺 service', characterName);
    const characterToHeal = AppState.characters.find(character => character.name == characterName)
    characterToHeal.health++
    console.log(characterToHeal);
  }

  hurtCharacter(characterName) {
    console.log('💢service', characterName);
    const characterToHurt = AppState.characters.find(character => character.name == characterName)
    characterToHurt.health--
    if (characterToHurt.health < 0) characterToHurt.health = 0
    console.log(characterToHurt)
  }
}

// NOTE singleton
export const charactersService = new CharactersService()