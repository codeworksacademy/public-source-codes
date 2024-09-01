import { AppState } from "../AppState.js";
import { homeService } from "../services/HomeService.js";

export class HomeController {
  constructor() {
    console.log('This is the Home Controller')
  }

  addClickCount() {
    console.log('clicked the button');
    homeService.addClickCount()
    this.drawClickCount()
  }

  drawClickCount() {
    const clickElm = document.getElementById('click-count')
    const clicks = AppState.clickCount
    clickElm.innerText = clicks.toString()
  }
}
