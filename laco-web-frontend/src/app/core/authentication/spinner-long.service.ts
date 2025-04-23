import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
})
export class SpinnerLongService {

    private visivel: boolean = false;

    get isVisivel(){
      return this.visivel;
    }



    setVisivel(){
      this.visivel = true;
    }


    setInvisivel(){
      this.visivel = false;
    }

}
