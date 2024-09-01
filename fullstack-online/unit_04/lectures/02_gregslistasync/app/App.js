import { AuthController } from './controllers/AuthController.js';
import { CarsController } from './controllers/CarsController.js';
import { router } from './router-config.js';
const USE_ROUTER = true

class App {

  AuthController = new AuthController()


  CarsController = new CarsController()

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
