console.log("Hello There.")

//  #region examples

// * Primitive Types
// Numbers
var x = 10 // var is old and outdated
let z = 12
let p = 5.5
let b = 2

// Strings
let string = "Mick"
let lastName = 'Shannahan'
let anotherString = `Anotha One`

// Booleans
let trueBoolean = true
let falseBoolean = false

let result = z == "12"
let strictResult = z === "12"


// * Reference Types
// Arrays store data using positions
//          0,  1,   2
let arr = [25, 50, 100]
let instructors = ['Mick', 'Jake', 'Jeremy']
let goofyCollection = [true, 10, "banana", [4, 5, 6]]

// console.log(instructors[0])
// console.log(instructors[1])
// console.log(instructors[2])

for (let i = 0; i < instructors.length; i++) {
  console.log(i, 'Hello', instructors[i])
}

// Object (Dictionary)
// Store data using Key : Value pairs
let obj = { first: "Mick", last: "Shannahan", favoriteColor: "Purple" }
console.log(obj.first, obj.favoriteColor)

let fruitSnack = {
  count: 8,
  calories: 200,
  name: 'Welchers',
  image: 'FruitSnack.jpg'
}

let granolaBar = {
  count: 1,
  calories: 50,
  name: 'Nature Best',
  image: 'Granola.jpg'
}

let pantry = [fruitSnack, granolaBar]

// #endregion

function greeting() {
  console.log("Howdy 🤠")
}

function double(num) {
  let doubled = num * 2
  console.log('❎', doubled)
}

let secretCode = "🦧🦖🦄🐈‍⬛🍗🍗🤠"

let userInput = ""


function inputOrangutan() {
  console.log('🦧')
  userInput = userInput + '🦧'
  drawUserInput()
}

function inputDino() {
  console.log('🦖')
  userInput += '🦖'
  drawUserInput()
}

function inputCowboy() {
  console.log('🤠')
  userInput += '🤠'
  drawUserInput()
}

function input(emoji) {
  console.log('input', emoji)
  userInput += emoji
  drawUserInput()
}

function drawUserInput() {
  let userCodeElm = document.getElementById('user-code')
  console.log(userCodeElm, userCodeElm.innerText);
  userCodeElm.innerText = userInput
}

function clearInput() {
  userInput = ""
  drawUserInput()
}

function revealSecret() {
  let secretImgElm = document.getElementById('secret-image')
  secretImgElm.classList.remove('d-none')
}

function submitCode() {
  console.log('Submitting', userInput, secretCode)
  if (userInput == secretCode) {
    console.log('correct code')
    window.alert('✅Correct Code')
    revealSecret()
  } else {
    console.log('incorrect code, try again')
    window.alert('❌Incorrect Code')
    clearInput()
  }
}