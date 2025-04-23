import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResult } from 'src/app/shared/models/login/login.model';
import { ItemMenu } from 'src/app/shared/models/user/layout.model';
import { WS_EMPRESA_ACESSO } from 'src/app/core/services/endpoints';
import { DefaultResponse } from 'src/app/shared/models/response/response.model';
import { ListaEmpresa } from 'src/app/shared/models/empresa/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaAcessoService {

  constructor(private http: HttpClient) { }


  getTokenAcessoEmpresa(empresaId: number): Observable<AuthResult> {
    return this.http
      .get<DefaultResponse<AuthResult>>(WS_EMPRESA_ACESSO + "/" + empresaId)
      .pipe(map((response) => response?.result));
  }

  getLayout(): Observable<ItemMenu[]> {
    return this.http
      .get<DefaultResponse<ItemMenu[]>>(WS_EMPRESA_ACESSO + "/layout")
      .pipe(map((response) => response?.result));
  }

  findAllAcessos(): Observable<ListaEmpresa[]> {
    return this.http
      .get<DefaultResponse<ListaEmpresa[]>>(WS_EMPRESA_ACESSO + "/acessos")
      .pipe(
        map((response) => {
          return response.result;
        })
      );
  }

}
