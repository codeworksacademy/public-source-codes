const animals = [
  {
    name: 'bubbles',
    emoji: '🦛',
    habitat: 'grassland',
    diet: 'fruit',
    weapon: 'teeth',
    alive: true
  },
  {
    name: 'oslo',
    emoji: '🦧',
    habitat: 'jungle',
    diet: 'fruit',
    weapon: 'limbs',
    alive: true
  },
  {
    name: 'snips',
    emoji: '🦀',
    habitat: 'oceanic',
    diet: 'trash',
    weapon: 'claws',
    alive: true
  },
  {
    name: 'bernard',
    emoji: '🐙',
    habitat: 'oceanic',
    diet: 'fish',
    weapon: 'limbs',
    alive: true
  },
  {
    name: 'herbert',
    emoji: '🦍',
    habitat: 'jungle',
    diet: 'fruit',
    weapon: 'limbs',
    alive: true
  },
  {
    name: 'fin',
    emoji: '🦈',
    habitat: 'oceanic',
    diet: 'fish',
    weapon: 'teeth',
    alive: true
  },
  {
    name: 'renaldo',
    emoji: '🦒',
    habitat: 'grassland',
    diet: 'salad',
    weapon: 'horns',
    alive: true
  },
  {
    name: 'maya',
    emoji: '🐑',
    habitat: 'mountain',
    diet: 'salad',
    weapon: 'limbs',
    alive: true
  },
  {
    name: 'marco',
    emoji: '🐏',
    habitat: 'mountain',
    diet: 'salad',
    weapon: 'horns',
    alive: true
  },
  {
    name: 'freddie',
    emoji: '🦅',
    habitat: 'mountain',
    diet: 'fish',
    weapon: 'claws',
    alive: true
  },
  {
    name: 'sher',
    emoji: '🐅',
    habitat: 'grasslands',
    diet: 'fish',
    weapon: 'claws',
    alive: true
  },
  {
    name: 'bobo',
    emoji: '🐒',
    habitat: 'jungle',
    diet: 'salad',
    weapon: 'limbs',
    alive: true
  },
  {
    name: 'mick',
    emoji: '🐊',
    habitat: 'jungle',
    diet: 'fish',
    weapon: 'teeth',
    alive: true
  },
  {
    name: 'ryan',
    emoji: '🦏',
    habitat: 'grasslands',
    diet: 'salad',
    weapon: 'horns',
    alive: true
  },
  {
    name: 'zara',
    emoji: '🦜',
    habitat: 'jungle',
    diet: 'salad',
    weapon: 'claws',
    alive: true
  },
  {
    name: 'jung',
    emoji: '🦓',
    habitat: 'grasslands',
    diet: 'salad',
    weapon: 'limbs',
    alive: true
  },
  {
    name: 'justin',
    emoji: '🐖',
    habitat: 'grasslands',
    diet: 'salad',
    weapon: 'teeth',
    alive: true
  },
  {
    name: 'ramon',
    emoji: '🦌',
    habitat: 'mountain',
    diet: 'salad',
    weapon: 'horns',
    alive: true
  },
  {
    name: 'sid',
    emoji: '🦫',
    habitat: 'mountain',
    diet: 'fish',
    weapon: 'teeth',
    alive: true
  },
  {
    name: 'remy',
    emoji: '🦥',
    habitat: 'jungle',
    diet: 'salad',
    weapon: 'claws',
    alive: true
  },
]

let murderer = animals[Math.floor(Math.random() * animals.length)]

const partyElm = document.getElementById('party-animals')


function drawParty() {
  let animalContent = ''
  // for (let i = 0; i < animals.length; i++) {
  //   const animal = animals[i]
  //   animalContent += `<span title="${animal.name}">${animal.emoji}</span>`
  // }
  let aliveAnimals = animals.filter((animal) => animal.alive)
  aliveAnimals.forEach((animal) => {
    // console.log('Howdy', animal.name)
    animalContent += `<span title="${animal.name}">${animal.emoji}</span>`
  })
  partyElm.innerHTML = animalContent
}

function drawGraveyard() {
  let graveyardContent = ''
  let deadAnimals = animals.filter((animal) => animal.alive == false)
  deadAnimals.forEach((animal) => graveyardContent += `
  <span class="dead" title="${animal.name}">${animal.emoji}</span>`)
  const graveyardElm = document.getElementById('graveyard-animals')
  graveyardElm.innerHTML = graveyardContent
}

function drawLimbUsers() {
  let limbsUsers = animals.filter((animal) => animal.weapon == 'limbs')
  console.log('🦾', limbsUsers);
  let animalContent = ''
  limbsUsers.forEach((animal) => animalContent += `
  <span title="${animal.name}">${animal.emoji}</span>
  `)
  partyElm.innerHTML = animalContent
}

function drawClawUsers() {
  let clawUsers = animals.filter((animal) => animal.weapon == 'claws')
  let animalContent = ''
  clawUsers.forEach((animal) => animalContent += `
  <span title="${animal.name}">${animal.emoji}</span>
  `)
  partyElm.innerHTML = animalContent
}

function drawWeaponUsers(weapon) {
  let weaponUsers = animals.filter((animal) => animal.weapon == weapon && animal.alive)
  console.log(weaponUsers);
  let animalContent = ''
  weaponUsers.forEach((animal) => animalContent += `
  <span title="${animal.name}">${animal.emoji}</span>
  `)
  partyElm.innerHTML = animalContent
}

function drawHabitatAnimals(habitat) {
  let habitatAnimals = animals.filter((animal) => animal.habitat == habitat && animal.alive)
  console.log('🌴', habitatAnimals);
  let animalContent = ''
  habitatAnimals.forEach((animal) => animalContent += `
  <span title="${animal.name}">${animal.emoji}</span>
  `)
  partyElm.innerHTML = animalContent
}

function drawFilteredAnimals(property, value) {
  let filteredAnimals = animals.filter((animal) => animal[property] == value && animal.alive)
  console.log('🔫', filteredAnimals);
  let animalContent = ''
  filteredAnimals.forEach((animal) => animalContent += `
  <span title="${animal.name}">${animal.emoji}</span>
  `)
  partyElm.innerHTML = animalContent
}

function guessMurderer() {
  const guess = window.prompt('Who Done it?')
  const guessedAnimal = animals.find((animal) => animal.name == guess)
  console.log('?', guess, guessedAnimal);

  if (guessedAnimal == undefined) {
    window.alert(`${guess} is not at this party, try again`)
    return
  }

  if (guessedAnimal == murderer) {
    window.alert("You got em! 🚓")
  } else {
    window.alert("That is not the murderer, they are still on the loose!")
    murderAnimal()
  }

}

function checkForLoss() {
  let deadAnimals = animals.filter((animal) => animal.alive == false)
  if (deadAnimals.length == animals.length - 1) {
    window.alert("You are a horrible detective, all the animals Died!")
    window.close()
  }
}

// function hello() {
//   console.log('Hello There');
// }

function murderAnimal() {
  const targets = animals.filter((animal) => animal != murderer && animal.alive)
  console.log('🎯', targets);
  let randomIndex = Math.floor(Math.random() * targets.length)
  let randomAnimal = targets[randomIndex]
  console.log('🎲', randomAnimal);
  randomAnimal.alive = false
  checkForLoss()
  drawParty()
  drawGraveyard()
  dropClue()
}

const possibleClues = ['weapon', 'diet', 'habitat', 'emoji', 'name']

function dropClue() {
  const clue = possibleClues.shift()
  const clueElm = document.getElementById('clues')
  console.log(clue);
  switch (clue) {
    case 'weapon':
      console.log('🗡️');
      clueElm.innerHTML += `<p>The victim was slain using ${murderer.weapon}</p>`
      break;
    case 'diet':
      console.log('🍎');
      clueElm.innerHTML += `<p>There were scraps of ${murderer.diet} at the scene of the crime</p>`
      break;
    case 'habitat':
      console.log('🌴');
      clueElm.innerHTML += `<p>A trail of blood lead into the ${murderer.habitat} section of the zoo</p>`
      break;
    case 'emoji':
      console.log('😀');
      clueElm.innerHTML += `<p class="fuzzy-footage">There was some fuzzy security footage ${murderer.emoji}</p>`
      break;
    case 'name':
      clueElm.innerHTML += `<p>A note was left at the scene, saying they will murder again, signed "-${murderer.name[0]}"</p>`
      console.log('name');
      break;
    default:
      clueElm.innerHTML += `<p>Out of clues. You better solve that murder!</p>`
      console.log('out of clues');
  }
}

drawParty()
murderAnimal()