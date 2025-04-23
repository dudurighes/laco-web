import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {
  WS_CNPJ_API,
} from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {EmpresaResponse} from "../../../shared/models/cnpj-api/cnpj-api.model";
import {DefaultResponse} from "../../../shared/models/response/response.model";

@Injectable({
  providedIn: 'root',
})

export class CnpjApiService {

  constructor(private http: HttpClient) {}

  findDataByCnpj(cnpj: string): Observable<EmpresaResponse> {
    const url = WS_CNPJ_API + cnpj;

    return this.http.get<EmpresaResponse>(url).pipe(
      tap(response => console.log('Resposta do findDataByCnpj:', response)), // Log da resposta
      map(response => response)
    );
  }


}
