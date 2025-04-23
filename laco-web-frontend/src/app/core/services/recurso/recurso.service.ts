import { map } from 'rxjs/operators';
import { WS_RECURSO } from '../endpoints';
import { DefaultResponse } from '../../../shared/models/response/response.model';
import { ListaRecurso, RegistraRecurso, AtualizarRecurso } from '../../../shared/models/recurso/recurso.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  constructor(private http: HttpClient) {}

  findAll(): Observable<ListaRecurso[]> {
    return this.http
      .get<DefaultResponse<ListaRecurso[]>>(WS_RECURSO)
      .pipe(map((response) => response?.result));
  }

  save(recurso: RegistraRecurso): Observable<boolean> {
    return this.http
      .post<DefaultResponse<boolean>>(WS_RECURSO, recurso)
      .pipe(map((response) => response?.result));
  }

  delete(recursoId: number): Observable<boolean> {
    return this.http
      .delete<DefaultResponse<boolean>>(WS_RECURSO + '/' + recursoId)
      .pipe(map((response) => response?.result));
  }

  update(recurso: AtualizarRecurso): Observable<boolean> {
    return this.http
      .put<DefaultResponse<boolean>>(WS_RECURSO, recurso)
      .pipe(map((response) => response?.result));
  }

  findById(recursoId: number): Observable<AtualizarRecurso> {
    return this.http.get<DefaultResponse<AtualizarRecurso>>(WS_RECURSO + "/" + recursoId).pipe(
      map(response => response?.result));
  }

}
