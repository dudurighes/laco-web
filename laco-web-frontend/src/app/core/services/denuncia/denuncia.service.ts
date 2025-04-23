import { DefaultResponse } from './../../../shared/models/response/response.model';
import { Observable, map } from 'rxjs';
import {
  Denuncia,
  PaginaDenuncia, SaveDenuncia,
} from './../../../shared/models/denuncia/denuncia.model';
import {WS_DENUNCIA} from './../endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class DenunciaService {
  constructor(private http: HttpClient) {}

  save(denuncia: SaveDenuncia): Observable<boolean> {
    return this.http
      .post<DefaultResponse<boolean>>(WS_DENUNCIA, denuncia)
      .pipe(map((response) => response?.result));
  }

  findByProtocolo(protocolo: string): Observable<Denuncia> {
    return this.http
      .get<DefaultResponse<Denuncia>>(WS_DENUNCIA + '/' + protocolo)
      .pipe(map((response) => response?.result));
  }

  // findDenuncias(page, size, search): Observable<PaginaDenuncia> {
  //   return this.http.get<DefaultResponse<PaginaDenuncia>>(WS_DENUNCIA,
  //     {
  //       params: {size, page, search }
  //     }).pipe(
  //       map(response => response?.result));
  // }

  findDenuncias(page, size, search): Observable<PaginaDenuncia> {
    return this.http.get<DefaultResponse<PaginaDenuncia>>(WS_DENUNCIA, {
      params: { size, page, search }
    }).pipe(
      tap(response => console.log('Response:', response)),
      map(response => response?.result)
    );
  }


  delete(denunciaId: number): Observable<boolean> {
    return this.http
      .delete<DefaultResponse<boolean>>(WS_DENUNCIA + '/' + denunciaId)
      .pipe(map((response) => response?.result));
  }

}
