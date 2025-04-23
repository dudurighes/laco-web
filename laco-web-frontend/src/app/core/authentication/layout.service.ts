import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    private usaTemaAlternativo: boolean = false;

    private classe: string;


    get theme() {
        return this.classe;
    }

    get useTheme(){

      return this.usaTemaAlternativo;
    }



    setConfigs(){

      this.usaTemaAlternativo = true;
      this.classe = "alt-theme";
    }

}
