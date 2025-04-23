import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TipoEntradaEnumModel} from "../../../shared/models/enuns/tipo-entrada-enum.model";
import {TipoEntradaEnum} from "../../../shared/models/enuns/tipo-entrada.enum";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TipoEntradaService {
  constructor(private http: HttpClient) {}

  getTipoEntradaEnumList(): TipoEntradaEnumModel[] {
    return Object.keys(TipoEntradaEnum).map(key => ({
      value: key,
      viewValue: TipoEntradaEnum[key as keyof typeof TipoEntradaEnum]
    }));
  }

  getTipoEntradaEnumObservable(): Observable<TipoEntradaEnumModel[]> {
    const options: TipoEntradaEnumModel[] = Object.keys(TipoEntradaEnum).map(key => ({
      value: key,
      viewValue: TipoEntradaEnum[key as keyof typeof TipoEntradaEnum]
    }));
    return of(options);
  }

}
