import { DefaultResponse } from '../../../shared/models/response/response.model';
import { Observable, map } from 'rxjs';
import {SaveTipoDenuncia, TipoDenuncia,} from '../../../shared/models/denuncia/denuncia.model';
import {WS_TIPO_DENUNCIA} from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TipoDenunciaService {
  constructor(private http: HttpClient) {}

  save(tipoDenuncia: SaveTipoDenuncia): Observable<boolean> {
    return this.http
      .post<DefaultResponse<boolean>>(WS_TIPO_DENUNCIA, tipoDenuncia)
      .pipe(map((response) => response?.result));
  }

  findAllEmpresa(): Observable<TipoDenuncia[]> {
    return this.http
      .get<DefaultResponse<TipoDenuncia[]>>(WS_TIPO_DENUNCIA)
      .pipe(map((response) => response?.result));
  }

  findByDescricao(filter: { search: string } = { search: '' }, page = 1): Observable<TipoDenuncia[]> {
    return this.http.get<DefaultResponse<TipoDenuncia[]>>(WS_TIPO_DENUNCIA + '/byDescricao',
      { params: filter }).pipe(
      map(response => response?.result));
  }

  delete(tipoDenunciaId: number): Observable<boolean> {
    return this.http
      .delete<DefaultResponse<boolean>>(WS_TIPO_DENUNCIA + '/' + tipoDenunciaId)
      .pipe(map((response) => response?.result));
  }

}
