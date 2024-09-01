import { router } from './router-config.js';
import { HomeController } from './controllers/HomeController.js';
import { CharactersController } from './controllers/CharactersController.js';
const USE_ROUTER = false

class App {

  HomeController = new HomeController()
  CharactersController = new CharactersController()

  constructor() {
    if (USE_ROUTER) {
      this.router = router
      this.router.init(this)
    }
  }

}

const app = new App()
// @ts-ignore
window.app = app



// This no longer works, party due to type Module
let count = 0 // State


// Controller / Service
function clickCount() {
  count++
  console.log(count);
}
console.log("App js is cool!")
