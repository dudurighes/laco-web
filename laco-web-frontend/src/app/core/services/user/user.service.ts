import {
  ListarUsuario,
  AtualizarUsuario,
  AtualizarUsuarioMeuPerfil,
  ConfirmaUsuario,
} from './../../../shared/models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthData, AuthResult } from 'src/app/shared/models/login/login.model';
import { DefaultResponse } from 'src/app/shared/models/response/response.model';
import {
  RegistrarUsuario,
  Usuario,
} from 'src/app/shared/models/user/user.model';
import { WS_LOGIN, WS_USER } from '../endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  login(authData: AuthData): Observable<AuthResult> {
    return this.http.post<AuthResult>(WS_LOGIN, authData);
  }

  findAll(): Observable<ListarUsuario[]> {
    return this.http
      .get<DefaultResponse<ListarUsuario[]>>(WS_USER)
      .pipe(map((response) => response?.result));
  }

  findAllAutoComplete(
    filter: { search: string } = { search: '' },
    page = 1
  ): Observable<ListarUsuario[]> {
    return this.http
      .get<DefaultResponse<ListarUsuario[]>>(WS_USER + '/findAllAutoComplete', {
        params: filter,
      })
      .pipe(map((response) => response?.result));
  }

  delete(userId: number): Observable<boolean> {
    return this.http
      .delete<DefaultResponse<boolean>>(WS_USER + '/' + userId)
      .pipe(map((response) => response?.result));
  }

  resetPasswordAdmin(usuarioId: number): Observable<boolean> {
    return this.http
      .put<DefaultResponse<boolean>>(WS_USER + '/resetaSenhaAdmin/' + usuarioId, usuarioId)
      .pipe(map((response) => response?.result));
  }

  deleteByAdmin(userId: number): Observable<boolean> {
    return this.http
      .delete<DefaultResponse<boolean>>(WS_USER + '/deleteByAdmin/' + userId)
      .pipe(map((response) => response?.result));
  }

  save(usuario: RegistrarUsuario): Observable<boolean> {
    return this.http
      .post<DefaultResponse<boolean>>(WS_USER, usuario)
      .pipe(map((response) => response?.result));
  }

  alteraInv(usuarioId: number): Observable<boolean> {
    return this.http
      .get<DefaultResponse<boolean>>(WS_USER + '/alterarInv/' + usuarioId)
      .pipe(map((response) => response?.result));
  }

  saveUsuarioEmpresa(
    usuario: RegistrarUsuario,
    usuarioId: number
  ): Observable<boolean> {
    return this.http
      .post<DefaultResponse<boolean>>(
        WS_USER + '/usuarioEmpresa/' + usuarioId,
        usuario
      )
      .pipe(map((response) => response?.result));
  }

  saveUsuarioEmpresaAdmin(
    usuario: RegistrarUsuario,
    usuarioId: number,
    empresaId: number
  ): Observable<boolean> {
    return this.http
      .post<DefaultResponse<boolean>>(
        WS_USER + '/usuarioEmpresa/' + usuarioId + '/' + empresaId,
        usuario
      )
      .pipe(map((response) => response?.result));
  }

  update(usuario: AtualizarUsuario): Observable<boolean> {
    return this.http
      .put<DefaultResponse<boolean>>(WS_USER + '/empresa', usuario)
      .pipe(map((response) => response?.result));
  }

  updateMeuPerfil(usuario: AtualizarUsuarioMeuPerfil): Observable<boolean> {
    return this.http
      .put<DefaultResponse<boolean>>(WS_USER, usuario)
      .pipe(map((response) => response?.result));
  }

  findById(usuarioId: number): Observable<AtualizarUsuario> {
    return this.http
      .get<DefaultResponse<AtualizarUsuario>>(WS_USER + '/' + usuarioId)
      .pipe(map((response) => response?.result));
  }

  findByIdUsuario(usuarioId: number): Observable<ConfirmaUsuario> {
    return this.http
      .get<DefaultResponse<ConfirmaUsuario>>(WS_USER + '/' + usuarioId)
      .pipe(map((response) => response?.result));
  }

  findByIdMeuPerfil(usuarioId: number): Observable<AtualizarUsuarioMeuPerfil> {
    return this.http
      .get<DefaultResponse<AtualizarUsuarioMeuPerfil>>(
        WS_USER + '/' + usuarioId
      )
      .pipe(map((response) => response?.result));
  }

  findAllByEmpresaId(empresaId: number): Observable<ListarUsuario[]> {
    return this.http
      .get<DefaultResponse<ListarUsuario[]>>(WS_USER + '/usuarios-empresa/' + empresaId)
      .pipe(map((response) => response?.result));
  }


}
