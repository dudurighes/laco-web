import {map, tap} from 'rxjs/operators';
import {catchError, Observable, of} from 'rxjs';
import {CepResponse, DefaultResponse} from 'src/app/shared/models/response/response.model';
import {WS_API_BRASIL, WS_MUNICIPIO, WS_NATUREZA_JURIDICA, WS_VIA_CEP} from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiCep, ApiCepDTO, Municipio} from 'src/app/shared/models/municipio/municipio.model';

@Injectable({
  providedIn: 'root',
})
export class MunicipioService {



  constructor(private http: HttpClient) {}

  findAll(): Observable<Municipio[]> {
    return this.http
      .get<DefaultResponse<Municipio[]>>(WS_MUNICIPIO)
      .pipe(map((response) => response?.result));
  }

  findByName(filter: { search: string } = { search: '' }, page = 1): Observable<Municipio[]> {
    return this.http.get<DefaultResponse<Municipio[]>>(WS_MUNICIPIO + '/byName',
      { params: filter }).pipe(
        map(response => response?.result));
  }

  findByIbge(search: string): Observable<Municipio> {
    return this.http.get<DefaultResponse<Municipio>>(WS_MUNICIPIO + '/byIbge/' + search).pipe(
      tap(response => console.log('Resposta do findByIbge:', response)), // Log da resposta
      map(response => response?.result)
    );
  }

  findMunicipioByViaCep(cep: string): Observable<ApiCep | undefined> {
    const url = WS_API_BRASIL + cep;
    return this.http.get<CepResponse>(url).pipe(
      map(response => {
        return response.result;
      }),
      catchError((error) => {
        return of(undefined); // ou qualquer valor padrão para lidar com erro
      })
    );
  }


}
