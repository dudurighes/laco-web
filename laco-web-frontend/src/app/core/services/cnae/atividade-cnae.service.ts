import {DefaultResponse} from '../../../shared/models/response/response.model';
import {Observable, map} from 'rxjs';
import {WS_ATIVIDADE_CNAE, WS_PERFIL} from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AtividadeCnaeDTO} from "../../../shared/models/cnae/atividade-cnae.model";
import {AtualizarPerfil} from "../../../shared/models/perfil/perfil.model";

@Injectable({
  providedIn: 'root',
})
export class AtividadeCnaeService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<AtividadeCnaeDTO[]> {
    return this.http
      .get<DefaultResponse<AtividadeCnaeDTO[]>>(WS_ATIVIDADE_CNAE)
      .pipe(map((response) => response?.result));
  }

  findById(cnaeId: string): Observable<AtividadeCnaeDTO> {
    return this.http.get<DefaultResponse<AtividadeCnaeDTO>>(WS_ATIVIDADE_CNAE + "/" + cnaeId).pipe(
      map(response => response?.result));
  }

}
