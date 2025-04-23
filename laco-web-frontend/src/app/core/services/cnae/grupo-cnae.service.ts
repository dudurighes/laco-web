import {DefaultResponse} from '../../../shared/models/response/response.model';
import {Observable, map, catchError, of} from 'rxjs';
import {WS_CNAE_IMPORT, WS_CNAE_GRUPO} from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GrupoCnaeDTO} from "../../../shared/models/cnae/grupo-cnae.model";

@Injectable({
  providedIn: 'root',
})
export class GrupoCnaeService {
  constructor(private http: HttpClient) {}

  private URL_GRUPO = "grupos";

  saveGrupo(secoes: GrupoCnaeDTO[]): Observable<boolean> {
    return this.http
      .post<DefaultResponse<boolean>>(WS_CNAE_GRUPO, secoes)
      .pipe(map((response) => response?.result));
  }

  getAllGrupoCnae(): Observable<GrupoCnaeDTO[]> {
    return this.http.get<GrupoCnaeDTO[]>(WS_CNAE_IMPORT + this.URL_GRUPO).pipe(
      map(response => {
        return response;
      }),
      catchError((error) => {
        return of(undefined);
      })
    );
  }

}
