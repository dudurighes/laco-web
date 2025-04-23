import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {WS_EMPRESA} from 'src/app/core/services/endpoints';
import {DefaultResponse} from 'src/app/shared/models/response/response.model';
import {
  ListaCustomEmpresaAcessos,
  ListaEmpresaPaginacao,
  SaveEmpresa
} from 'src/app/shared/models/empresa/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) {
  }

  save(empresa: SaveEmpresa): Observable<boolean> {
    return this.http
      .post<DefaultResponse<boolean>>(WS_EMPRESA, empresa)
      .pipe(map((response) => response?.result));
  }

  deleteEmpresa(id: number): Observable<boolean> {
    return this.http
      .put<DefaultResponse<boolean>>(WS_EMPRESA + "/" + id + "/delete", null)
      .pipe(map((response) => response?.result));
  }

  findEmpresas(page, size, search): Observable<ListaEmpresaPaginacao> {
    return this.http.get<DefaultResponse<ListaEmpresaPaginacao>>(WS_EMPRESA, {
      params: {size, page, search}
    }).pipe(
      tap(response => console.log('Response:', response)),
      map(response => response?.result)
    );
  }

  findAllAcessos(): Observable<ListaCustomEmpresaAcessos> {
    return this.http
      .get<DefaultResponse<ListaCustomEmpresaAcessos>>(WS_EMPRESA + "/usuario/acessos")
      .pipe(
        map((response) => {

          const listaCustomEmpresa: ListaCustomEmpresaAcessos = response?.result;
          if (listaCustomEmpresa) {
            listaCustomEmpresa?.vigilanciaList?.forEach((empresa) => {
              empresa.safeLogo = this.sanitizeUrlLogo(empresa.logo);
            });
            listaCustomEmpresa?.empresaList?.forEach((empresa) => {
              empresa.safeLogo = this.sanitizeUrlLogo(empresa.logo);
            });
          }
          return listaCustomEmpresa;
        })
      );
  }

  sanitizeUrlLogo(urlLogo: string): SafeUrl {
    if (!urlLogo) {
      return "../../../assets/img/icons/icons-128/image.png";
    }
    return this.sanitizer.bypassSecurityTrustUrl(urlLogo);
  }


}
