const animals = [
  {
    name: 'oslo',
    emoji: '🦧',
    unlocked: true,
    hunger: 100, // sick 0 - 100 very happy
    status: '😁' // 🤒 😖 😐 😊 😁
  },
  {
    name: 'jung',
    emoji: '🦓',
    unlocked: true,
    hunger: 100, // sick 0 - 100 very happy
    status: '😁' // 🤒 😖 😐 😊 😁
  },
  {
    name: 'snips',
    emoji: '🦀',
    unlocked: true,
    hunger: 100, // sick 0 - 100 very happy
    status: '😁' // 🤒 😖 😐 😊 😁
  },
  {
    name: 'roger',
    emoji: '🦙',
    unlocked: false,
    hunger: 100, // sick 0 - 100 very happy
    status: '😁' // 🤒 😖 😐 😊 😁
  },
  {
    name: 'teef',
    emoji: '🦈',
    unlocked: false,
    hunger: 100, // sick 0 - 100 very happy
    status: '😁' // 🤒 😖 😐 😊 😁
  },
  {
    name: 'isabelle',
    emoji: '🦒',
    unlocked: false,
    hunger: 100, // sick 0 - 100 very happy
    status: '😁' // 🤒 😖 😐 😊 😁
  },
]

let bank = 0

function animalsHunger() {
  // console.log('🍽️')
  animals.forEach(animal => {
    if (animal.unlocked) {
      animal.hunger -= 1
      if (animal.hunger < 0) animal.hunger = 0
    }

  })
  updateAnimalStatuses()
  updateAnimals()
  drawPaycheck()
}

// setInterval(() => console.log('interval!'), 250)
setInterval(animalsHunger, 750)

function updateAnimalStatuses() {
  animals.forEach(animal => {
    if (animal.hunger > 90) {
      animal.status = '😁'
    } else if (animal.hunger > 70) {
      animal.status = '😊'
    } else if (animal.hunger > 30) {
      animal.status = '😐'
    } else if (animal.hunger > 15) {
      animal.status = '😖'
    } else if (animal.hunger == 0) {
      animal.status = '🤒'
    }
  })
}

function updateAnimals() {
  animals.forEach(animal => {
    let animalPenElm = document.getElementById(animal.name)
    // console.log(animal.name, animalPenElm);
    let statsElm = animalPenElm.querySelector('.stats')
    // console.log('📈', statsElm);
    // @ts-ignore
    statsElm.innerText = `${animal.name} | ${animal.hunger} | ${animal.status}`
  })
}

function feedAnimal(animalName) {
  console.log('🍖', animalName);
  const animalToFeed = animals.find(animal => animal.name == animalName)
  console.log(animalToFeed);
  animalToFeed.hunger += 4
  if (animalToFeed.hunger > 100) animalToFeed.hunger = 100

  updateAnimalStatuses()
  updateAnimals()
  drawPaycheck()
}

function getPaycheck() {
  let check = 0
  animals.forEach(animal => {
    if (animal.unlocked == false) return // end's the current iteration early
    switch (animal.status) {
      case '😁':
        check += 10
        break
      case '😊':
        check += 7.50
        break;
      case '😐':
        check += 5
        break
      case '😖':
        check += 1
        break
      case '🤒':
        check -= 5
        break
    }
  })
  console.log('💵', check);
  return check
}

function drawPaycheck() {
  const paycheckElm = document.getElementById('paycheck')
  paycheckElm.innerText = `$${getPaycheck()}`
}

function addCheckToBank() {
  let check = getPaycheck()
  bank += check
  drawBank()
}

function drawBank() {
  const bankElm = document.getElementById('bank')
  bankElm.innerText = `$${bank}`
}

setInterval(addCheckToBank, 1000)

function unlockAnimal() {
  if (bank >= 1000) {
    bank -= 1000
    drawBank()
    const nextAnimal = animals.find(animal => animal.unlocked == false)
    nextAnimal.unlocked = true
    const animalPenElm = document.getElementById(nextAnimal.name)
    animalPenElm.classList.remove('d-none')
  } else {
    console.log('not enough cash');
  }
}