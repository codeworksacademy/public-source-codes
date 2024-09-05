import { reactive } from 'vue'
import { FullMovie, Movie } from './models/Movie.js'


// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({

  /** @type {Movie[]} */
  movies: [],

  currentPage: 1,
  totalPages: Infinity,

  currentSearch: null,

  /** @type {FullMovie} */
  activeMovie: null,

  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null
})

