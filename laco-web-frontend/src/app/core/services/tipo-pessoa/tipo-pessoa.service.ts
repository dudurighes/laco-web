import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TipoPessoaEnumModel} from "../../../shared/models/enuns/tipo-pessoa-enum.model";
import {TipoPessoaEnum} from "../../../shared/models/enuns/tipo-pessoa.enum";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TipoPessoaService {
  constructor(private http: HttpClient) {}

  getTipoPessoaEnumOptions(): TipoPessoaEnumModel[] {
    return Object.keys(TipoPessoaEnum).map(key => ({
      value: key,
      viewValue: TipoPessoaEnum[key as keyof typeof TipoPessoaEnum]
    }));
  }

  getTipoPessoaEnumObservable(): Observable<TipoPessoaEnumModel[]> {
    const options: TipoPessoaEnumModel[] = Object.keys(TipoPessoaEnum).map(key => ({
      value: key,
      viewValue: TipoPessoaEnum[key as keyof typeof TipoPessoaEnum]
    }));
    return of(options);
  }

}
