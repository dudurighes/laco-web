import {DefaultResponse} from '../../../shared/models/response/response.model';
import {Observable, map, catchError, of} from 'rxjs';
import {WS_CNAE_IMPORT, WS_CNAE_SUBCLASSE} from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SubclasseCnaeDTO} from "../../../shared/models/cnae/subclasse-cnae.model";

@Injectable({
  providedIn: 'root',
})
export class SubclasseCnaeService {
  constructor(private http: HttpClient) {}

  private URL_SUBCLASSE = "subclasses";

  saveSubclasse(secoes: SubclasseCnaeDTO[]): Observable<boolean> {
    return this.http
      .post<DefaultResponse<boolean>>(WS_CNAE_SUBCLASSE, secoes)
      .pipe(map((response) => response?.result));
  }

  getAllSubclasseCnae(): Observable<SubclasseCnaeDTO[]> {
    return this.http.get<SubclasseCnaeDTO[]>(WS_CNAE_IMPORT + this.URL_SUBCLASSE).pipe(
      map(response => {
        return response;
      }),
      catchError((error) => {
        return of(undefined);
      })
    );
  }

}
