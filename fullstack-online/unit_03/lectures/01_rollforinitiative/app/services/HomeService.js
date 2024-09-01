import { AppState } from "../AppState.js";



class HomeService {

  addClickCount() {
    console.log('service click');
    AppState.clickCount++
    console.log(AppState.clickCount);
  }

}

export const homeService = new HomeService()