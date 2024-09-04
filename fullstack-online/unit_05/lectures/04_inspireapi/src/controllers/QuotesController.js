import { Auth0Provider } from "@bcwdev/auth0provider";
import { quotesService } from "../services/QuotesService.js";
import BaseController from "../utils/BaseController.js";



export class QuotesController extends BaseController {
  constructor() {
    super('api/quotes')
    this.router
      .get('', this.getRandomQuote)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createQuote)
  }

  async getRandomQuote(request, response, next) {
    try {
      const randQuote = await quotesService.getRandomQuote()
      response.send(randQuote)
    } catch (error) {
      next(error)
    }
  }

  async createQuote(request, response, next) {
    try {
      const quoteData = request.body
      const user = request.userInfo
      quoteData.authorId = user.id
      const quote = await quotesService.createQuote(quoteData)
      response.send(quote)
    } catch (error) {
      next(error)
    }
  }
}
