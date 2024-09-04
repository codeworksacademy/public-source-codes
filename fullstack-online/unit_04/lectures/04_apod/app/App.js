import { AuthController } from './controllers/AuthController.js';
import { NasaController } from './controllers/NasaController.js';
import { SandboxController } from './controllers/SadboxController.js';
import { router } from './router-config.js';
const USE_ROUTER = false

class App {

  AuthController = new AuthController()

  NasaController = new NasaController()
  SandboxController = new SandboxController()



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
