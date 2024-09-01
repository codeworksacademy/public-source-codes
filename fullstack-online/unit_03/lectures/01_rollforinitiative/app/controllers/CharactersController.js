import { AppState } from "../AppState.js";
import { charactersService } from "../services/CharactersService.js";




export class CharactersController {
  constructor() {
    console.log('Characters Loaded', AppState.characters);
    this.drawCharacters()
  }


  healCharacter(characterName) {
    console.log('🩺', characterName);
    charactersService.healCharacter(characterName)
    this.drawCharacters()
  }

  hurtCharacter(characterName) {
    console.log('💢hurting', characterName);
    charactersService.hurtCharacter(characterName)
    this.drawCharacters()
  }

  drawCharacters() {
    const characterElm = document.getElementById('character-cards')
    let characterContent = ''
    const characters = AppState.characters
    characters.forEach((character) => characterContent += character.characterCard())
    characterElm.innerHTML = characterContent
  }
}