import { AppState } from "../AppState.js"



export class Apod {
  constructor(data) {
    this.id = data.id
    this.imgUrl = data.imgUrl || data.hdurl
    this.description = data.description || data.explanation
    this.author = data.author || data.copyright || ''
    this.date = data.date
  }

  get apodTemplate() {
    return /*html*/`
    <div class="col-md-10 col-lg-8 col-xl-7">
      <h2>${this.date}</h2>
      <p>${this.description}</p>
      <div class="d-flex justify-content-between">
        <span class="fw-bold">${this.author}</span>
       ${this.saveButton}
      </div>
    </div>
    `
  }

  get saveButton() {
    const alreadySaved = AppState.myAPODs.find(apod => apod.date == this.date)
    if (alreadySaved) {
      return ` <button disabled class="btn btn-outline-light bg-glass">Saved <i class="mdi mdi-check-bold"></i></button>`
    }
    if (AppState.user) {
      return ` <button onclick="app.SandboxController.saveAPOD()" class="btn btn-outline-light bg-glass">save <i class="mdi mdi-content-save"></i></button>`
    }
    return 'please log in to save'
  }

  get apodListTemplate() {
    return /*html*/`
    <div onclick="app.SandboxController.setActiveAPOD('${this.id}')" class="d-flex mb-2 selectable justify-content-between p-1" role="button" >
      <img class="list-preview" src="${this.imgUrl}"/>
      <div>${this.date}</div>
      <button onclick="app.SandboxController.removeFavorite('${this.id}')" type="button" title="remove favorite" class="btn btn-outline-danger border-0"><i class="mdi mdi-window-close"></i></button>
    </div>
    `
  }
}


/*
date: String, required
imgUrl: String, required
creatorId: SchemaObjectId, required
*creator: Object (Virtual Added by Database)
description: String, 
author: Object, 
originalId: String, 
*createdAt: ISO Timestamp (Virtual Added by Database)
*updatedAt: ISO Timestamp (Virtual Added by Database)
 */