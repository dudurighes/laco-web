import {DefaultResponse} from '../../../shared/models/response/response.model';
import {Observable, map, catchError, of} from 'rxjs';
import {WS_CNAE_DIVISAO, WS_CNAE_IMPORT} from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DivisaoCnaeDTO} from "../../../shared/models/cnae/divisao-cnae.model";

@Injectable({
  providedIn: 'root',
})
export class DivisaoCnaeService {
  constructor(private http: HttpClient) {}

  private URL_DIVISAO = "divisoes";

  saveDivisao(divisoes: DivisaoCnaeDTO[]): Observable<boolean> {
    return this.http
      .post<DefaultResponse<boolean>>(WS_CNAE_DIVISAO, divisoes)
      .pipe(map((response) => response?.result));
  }

  getAllDivisaoCnae(): Observable<DivisaoCnaeDTO[]> {
    return this.http.get<DivisaoCnaeDTO[]>(WS_CNAE_IMPORT + this.URL_DIVISAO).pipe(
      map(response => {
        return response;
      }),
      catchError((error) => {
        return of(undefined);
      })
    );
  }

}
