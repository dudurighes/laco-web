import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DefaultResponse } from 'src/app/shared/models/response/response.model';
import {WS_NATUREZA_JURIDICA, WS_PERFIL} from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NaturezaJuridica } from 'src/app/shared/models/naturezaJuridica/natureza-juridica.model';
import {AtualizarPerfil} from "../../../shared/models/perfil/perfil.model";

@Injectable({
  providedIn: 'root',
})
export class NaturezaJuridicaService {

  constructor(private http: HttpClient) {}

  findAll(): Observable<NaturezaJuridica[]> {
    return this.http
      .get<DefaultResponse<NaturezaJuridica[]>>(WS_NATUREZA_JURIDICA)
      .pipe(map((response) => response?.result));
  }

  findById(naturezaId: string): Observable<NaturezaJuridica> {
    return this.http.get<DefaultResponse<NaturezaJuridica>>(WS_NATUREZA_JURIDICA + "/" + naturezaId).pipe(
      map(response => response?.result));
  }


}
