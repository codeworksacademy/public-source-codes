import { generateId } from "../utils/GenerateId.js";



export class CaseFile {
  constructor(data) {
    this.id = data.id || generateId()
    this.agency = data.agency
    this.caseNumber = this.agency + '-' + this.id.slice(5, 10).toUpperCase()
    this.body = data.body || ''
    this.reportedDate = new Date(data.reportedDate)
    // TODO comeback to add in additional properties for REDACTING
    this.lastSaved = data.lastSaved ? new Date(data.lastSaved) : new Date()
    this.redacted = true
  }

  get ListTemplate() {
    return /*html*/`
    <div onclick="app.CaseFilesController.setActiveCaseFile('${this.id}')" class="btn text-start fw-bold mb-1" role="button">
    ${this.caseNumber}
    </div>`
  }

  get ActiveCaseFile() {
    return /*html*/ `
<div class="d-flex justify-content-between">
  <h2>${this.caseNumber}</h2>
  <p class="fw-bold fs-4">${this.agency}</p>
</div>
<p>${this.ReportedDateFormatted}</p>
<form onsubmit="app.CaseFilesController.saveActiveCase()" class="p-2">
  <textarea name="body" id="case-body" class="bg-white border rounded p-2 form-control">${this.body}</textarea>
  <div class="d-flex justify-content-between">
  <button type="button" onclick="app.CaseFilesController.deleteActiveCase()" class="btn text-danger"><i class="mdi mdi-delete-forever"></i>delete case </button>
  <button type="submit" class="btn btn-success">save <i class="mdi mdi-floppy-disk"></i></button>
  </div>
  <div class="text-secondary text-end">last saved: ${this.lastSavedFormatted}</div>
</form>
`
  }

  get RedactedCaseFile() {
    return /*html*/ `
    <div class="d-flex justify-content-between">
      <h2>${this.caseNumber}</h2>
      <p class="fw-bold fs-4">${this.agency}</p>
    </div>
    <p>${this.ReportedDateFormatted}</p>
    <form class="p-2">
      <textarea disabled name="body" id="case-body" class="bg-white border rounded p-2 form-control">${this.redactedBody}</textarea>
      <div class="d-flex justify-content-between">
      <button type="button" onclick="app.CaseFilesController.deleteActiveCase()" class="btn text-danger"><i class="mdi mdi-delete-forever"></i>delete case </button>
      <button onclick="app.CaseFilesController.unlockActiveCaseFile()" type="button" class="btn btn-warning">unlock <i class="mdi mdi-lock"></i></button>
      </div>
      <div class="text-secondary text-end">last saved: ${this.lastSavedFormatted}</div>
    </form>
    `
  }

  get redactedBody() {
    let redacted = []
    let words = this.body.split(' ')
    words.forEach(word => {
      if (word.includes('a')) redacted.push('⬛⬛⬛')
      else redacted.push(word)
    })
    return redacted.join(' ')
  }




  get ReportedDateFormatted() {
    return this.reportedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      dayPeriod: 'long',
    })
  }

  get lastSavedFormatted() {
    return this.lastSaved.toLocaleTimeString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      second: '2-digit',
    })
  }
}