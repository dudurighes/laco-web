import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DefaultResponse } from 'src/app/shared/models/response/response.model';
import {WS_ORGAO_EMISSOR} from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {OrgaoEmissor} from "../../../shared/models/orgaoEmissor/orgao-emissor.model";

@Injectable({
  providedIn: 'root',
})
export class OrgaoEmissorService {

  constructor(private http: HttpClient) {}

  findAll(): Observable<OrgaoEmissor[]> {
    return this.http
      .get<DefaultResponse<OrgaoEmissor[]>>(WS_ORGAO_EMISSOR)
      .pipe(map((response) => response?.result));
  }


}
