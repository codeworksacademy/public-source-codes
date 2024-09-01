import { AppState } from "../AppState.js"
import { CaseFile } from "../models/CaseFile.js";
import { loadState, saveState } from "../utils/Store.js";


class CaseFilesService {
  unlockActiveCaseFile() {
    const activeCase = AppState.activeCase
    activeCase.redacted = false
    AppState.emit('activeCase')
  }


  createCaseFile(caseData) {
    const caseFile = new CaseFile(caseData)
    console.log('📂✨', caseFile);
    AppState.caseFiles.push(caseFile)
    this.saveCases()
  }
  setActiveCaseFile(caseId) {
    const selectedCase = AppState.caseFiles.find(caseFile => caseFile.id == caseId)
    console.log('👆📂', selectedCase);
    AppState.activeCase = selectedCase
    console.log(AppState);
  }

  saveActiveCase(newBody) {
    const activeCase = AppState.activeCase
    activeCase.body = newBody
    activeCase.lastSaved = new Date()
    activeCase.redacted = true
    console.log(AppState);
    this.saveCases()
    AppState.emit('activeCase')
  }

  deleteActiveCase() {
    const activeCase = AppState.activeCase
    const indexToRemove = AppState.caseFiles.indexOf(activeCase)
    AppState.activeCase = null
    AppState.caseFiles.splice(indexToRemove, 1)
    this.saveCases()
  }



  saveCases() {
    const cases = AppState.caseFiles
    saveState('caseFiles', cases)
  }

  loadCases() {
    const cases = loadState('caseFiles', [CaseFile])
    console.log('loaded cases', cases);
    AppState.caseFiles = cases
  }

}

export const caseFilesService = new CaseFilesService()