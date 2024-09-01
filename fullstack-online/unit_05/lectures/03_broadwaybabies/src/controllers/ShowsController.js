import { Auth0Provider } from "@bcwdev/auth0provider";
import { showsService } from "../services/ShowsService.js";
import BaseController from "../utils/BaseController.js";



export class ShowsController extends BaseController {
  constructor() {
    super('api/shows')
    this.router
      .get('', this.getAllShows)
      .use((request, response, next) => {
        console.log('Running Middleware');
        next()
      })
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createShow)
  }

  async getAllShows(request, response, next) {
    try {
      const shows = await showsService.getAllShows()
      response.send(shows)
    } catch (error) {
      next(error)
    }
  }

  async createShow(request, response, next) {
    try {

      const showData = request.body
      console.log('show Data', showData);
      const userInfo = request.userInfo
      showData.handlerId = userInfo.id
      console.log(userInfo.name, 'is creating a show');
      console.log('after handlerId switch', showData);

      const show = await showsService.createShow(showData)
      response.send(show)
    } catch (error) {
      next(error)
    }
  }
}
