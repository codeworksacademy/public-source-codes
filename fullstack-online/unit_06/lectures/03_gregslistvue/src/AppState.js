import { reactive } from 'vue'
import { Car } from './models/Car.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({


  /** @type {Car[]} */
  cars: [],



  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null
})

