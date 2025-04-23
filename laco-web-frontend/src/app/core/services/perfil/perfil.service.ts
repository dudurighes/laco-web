import { map } from 'rxjs/operators';
import { WS_PERFIL } from '../endpoints';
import { DefaultResponse } from 'src/app/shared/models/response/response.model';
import { ListaPerfil, RegistraPerfil, AtualizarPerfil, PerfilDTO, PerfilRecurso } from '../../../shared/models/perfil/perfil.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})



export class PerfilService {
  private readonly API = '/perfil';

  constructor(private http: HttpClient) {}

  findAll(): Observable<ListaPerfil[]> {
    return this.http
      .get<DefaultResponse<ListaPerfil[]>>(WS_PERFIL)
      .pipe(map((response) => response?.result));
  }

  findAllByEmpresaId(empresaId: number): Observable<ListaPerfil[]> {
    return this.http
      .get<DefaultResponse<ListaPerfil[]>>(WS_PERFIL + "/acessos/" + empresaId)
      .pipe(map((response) => response?.result));
  }

  save(documentacao: RegistraPerfil): Observable<boolean> {
    return this.http
      .post<DefaultResponse<boolean>>(WS_PERFIL, documentacao)
      .pipe(map((response) => response?.result));
  }

  findPerfilRecursoNovo(idRole: string): Observable<PerfilRecurso[]> {
    return this.http
      .get<DefaultResponse<PerfilRecurso[]>>(WS_PERFIL + "/recursos/" + idRole)
      .pipe(map((response) => response?.result));
  }

  buscaRecursosNaoSalvos(perfilId: number): Observable<PerfilRecurso[]> {
    return this.http
      .get<DefaultResponse<PerfilRecurso[]>>(WS_PERFIL + "/recursos/new/" + perfilId)
      .pipe(map((response) => response?.result));
  }

  delete(perfilId: number): Observable<boolean> {
    return this.http
      .delete<DefaultResponse<boolean>>(WS_PERFIL + '/' + perfilId)
      .pipe(map((response) => response?.result));
  }

  update(perfil: AtualizarPerfil): Observable<boolean> {
    return this.http
      .put<DefaultResponse<boolean>>(WS_PERFIL, perfil)
      .pipe(map((response) => response?.result));
  }

  findById(roleId: number): Observable<AtualizarPerfil> {
    return this.http.get<DefaultResponse<AtualizarPerfil>>(WS_PERFIL + "/" + roleId).pipe(
      map(response => response?.result));
  }


  findByIdConfig(roleId: number): Observable<PerfilDTO> {
    return this.http.get<DefaultResponse<PerfilDTO>>(WS_PERFIL + "/" + roleId).pipe(
      map(response => response?.result));
  }
}
