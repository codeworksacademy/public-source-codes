import { AppState } from "../AppState.js";
import { caseFilesService } from "../services/CaseFilesService.js";
import { getFormData } from "../utils/FormHandler.js";



export class CaseFilesController {
  constructor() {
    console.log('📂🎮');
    this.drawCaseFilesList()
    AppState.on('activeCase', this.drawActiveCase)
    AppState.on('caseFiles', this.drawCaseFilesList)
    caseFilesService.loadCases()
    this.drawActiveCase()
  }

  createCaseFile() {
    event.preventDefault()
    const form = event.target
    const caseData = getFormData(form)
    console.log('submitted', form, caseData);
    caseFilesService.createCaseFile(caseData)
  }

  drawCaseFilesList() {
    const caseFiles = AppState.caseFiles
    let listContent = ''
    caseFiles.forEach(caseFile => listContent += caseFile.ListTemplate)
    const listElm = document.getElementById('case-files-list')
    const countElm = document.getElementById('case-count')
    listElm.innerHTML = listContent
    countElm.innerText = caseFiles.length.toString()
  }

  drawActiveCase() {
    const activeCase = AppState.activeCase
    const activeElm = document.getElementById('active-case')
    if (activeCase) {
      const activeContent = activeCase.redacted ? activeCase.RedactedCaseFile : activeCase.ActiveCaseFile
      activeElm.innerHTML = activeContent
    } else {
      activeElm.innerHTML = `
      <h2 class="text-secondary">Please Select a Case</h2>
      `
    }
  }

  setActiveCaseFile(caseId) {
    console.log('setting active', caseId);
    caseFilesService.setActiveCaseFile(caseId)
  }

  saveActiveCase() {
    event.preventDefault()
    console.log('saving active case');
    const form = event.target
    const newBody = form.body.value
    console.log('new 📃', newBody);
    caseFilesService.saveActiveCase(newBody)
  }

  deleteActiveCase() {
    console.log('deleting');
    const confirmed = confirm('Are you sure you want to delete this?')
    if (confirmed == false) return

    caseFilesService.deleteActiveCase()
  }

  unlockActiveCaseFile() {
    const passcode = prompt("What is the passcode?")
    console.log(passcode);
    if (passcode != 'p@ssw0rd!') return
    caseFilesService.unlockActiveCaseFile()
  }
}