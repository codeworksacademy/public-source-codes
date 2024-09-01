import { Car } from './models/Car.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {


  cars = [
    new Car({
      make: 'Mazda',
      model: 'Miata',
      year: 1998,
      color: 'black',
      imgUrl: 'https://images.unsplash.com/photo-1661963834892-80058578ed84?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVkJTIwbWlhdGF8ZW58MHx8MHx8fDA%3D',
      price: 9000
    }),
    new Car({
      make: 'Honda',
      model: 'Civic',
      year: 2008,
      color: 'white',
      imgUrl: 'https://images.unsplash.com/photo-1659649780241-0393f564d7bc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2hpdGUlMjBjaXZpY3xlbnwwfHwwfHx8MA%3D%3D',
      price: 12000
    }),
    new Car({
      make: 'Volkswagen',
      model: 'Bug',
      year: 1990,
      color: 'teal',
      imgUrl: 'https://images.unsplash.com/photo-1511407401960-0ee203836665?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: 6000
    }),
  ]




  /**@type {import('./models/Example.js').Example[]} */
  examples = []
}

export const AppState = createObservableProxy(new ObservableAppState())