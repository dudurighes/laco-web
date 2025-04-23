import {DefaultResponse} from '../../../shared/models/response/response.model';
import {Observable, map, catchError, of, throwError} from 'rxjs';
import {WS_CNAE_IMPORT, WS_CNAE_SECAO} from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SnackBarMessageService} from "../../../shared/components/snack-bar-message/snack-bar-message.service";
import {SecaoCnaeDTO} from "../../../shared/models/cnae/secao-cnae.model";

@Injectable({
  providedIn: 'root',
})
export class SecaoCnaeService {
  constructor(private http: HttpClient,
              private messageService: SnackBarMessageService,) {}

  private URL_SECAO = "secoes";

  saveSecao(secoes: SecaoCnaeDTO[]): Observable<boolean> {
    return this.http
      .post<DefaultResponse<boolean>>(WS_CNAE_SECAO, secoes)
      .pipe(map((response) => response?.result));
  }

  getAllSecaoCnae(): Observable<SecaoCnaeDTO[]> {
    return this.http.get<SecaoCnaeDTO[]>(WS_CNAE_IMPORT + this.URL_SECAO).pipe(
      map(response => {
        return response;
      }),
      catchError((error) => {
        if (error.status === 0 && error.message.includes('ERR_NAME_NOT_RESOLVED')) {
          this.messageService.openSnackBarError('Não foi possível resolver o nome do domínio. ' +
            'Verifique sua conexão com a internet.');
        } else {
          this.messageService.openSnackBarError('Erro ao chamar API: ' + (error.error?.message || error.message));
        }
        return throwError(() => new Error('Não foi possível conectar ao servidor.'));
      })
    );
  }

}
