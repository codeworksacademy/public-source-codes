import { AuthController } from './controllers/AuthController.js';
import { DndController } from './controllers/DndController.js';
import { SandboxController } from './controllers/SandBoxController.js';
import { router } from './router-config.js';
const USE_ROUTER = false

class App {

  AuthController = new AuthController()

  DndController = new DndController()

  SandboxController = new SandboxController()


  constructor() {
    if (USE_ROUTER) {
      router = router
      this.router.init(app)
    }
  }
}


const app = new App()
// @ts-ignore
window.app = app
