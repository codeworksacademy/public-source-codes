import { CaseFile } from './models/CaseFile.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {


  caseFiles = [
    new CaseFile({
      agency: '👽A51',
      reportedDate: '08/31/2022',
      body: "Farmer John saw an unidentified object floating over their cow field."
    }),
    new CaseFile({
      agency: '🌲SNFS',
      reportedDate: '12/1/1990',
      body: "A wood cutter ran into a large Jolly Fellow in the woods, trying to repair a bright red sleigh."
    }),
    new CaseFile({
      agency: '🏢IGA',
      reportedDate: '02/23/2021',
      body: "Director Elvis Presley was out sick this day. Ate too many 5-layer burritos"
    }),
  ]

  /** @type {CaseFile} */
  activeCase = null




  /**@type {import('./models/Example.js').Example[]} */
  examples = []
}

export const AppState = createObservableProxy(new ObservableAppState())