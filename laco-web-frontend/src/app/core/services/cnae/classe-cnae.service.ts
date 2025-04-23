import {CepResponse, DefaultResponse} from '../../../shared/models/response/response.model';
import {Observable, map, catchError, of} from 'rxjs';
import {WS_API_BRASIL, WS_CNAE_IMPORT, WS_CNAE_CLASSE, WS_TIPO_DENUNCIA} from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ClasseCnaeDTO} from "../../../shared/models/cnae/classe-cnae.model";

@Injectable({
  providedIn: 'root',
})
export class ClasseCnaeService {
  constructor(private http: HttpClient) {}

  private URL_CLASSE = "classes";

  saveClasse(classes: ClasseCnaeDTO[]): Observable<boolean> {
    return this.http
      .post<DefaultResponse<boolean>>(WS_CNAE_CLASSE, classes)
      .pipe(map((response) => response?.result));
  }

  getAllClasseCnae(): Observable<ClasseCnaeDTO[]> {
    return this.http.get<ClasseCnaeDTO[]>(WS_CNAE_IMPORT + this.URL_CLASSE).pipe(
      map(response => {
        return response;
      }),
      catchError((error) => {
        return of(undefined);
      })
    );
  }

}
