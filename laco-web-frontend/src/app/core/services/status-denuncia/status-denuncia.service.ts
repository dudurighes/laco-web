import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {StatusDenunciaEnumModel} from "../../../shared/models/enuns/status-denuncia-enum.model";
import {StatusDenunciaEnum} from "../../../shared/models/enuns/status-denuncia.enum";
import {Observable, of} from "rxjs";
import {TipoEntradaEnum} from "../../../shared/models/enuns/tipo-entrada.enum";

@Injectable({
  providedIn: 'root',
})
export class StatusDenunciaService {
  constructor(private http: HttpClient) {}

  getStatusDenunciaEnumOptions(): StatusDenunciaEnumModel[] {
    return Object.keys(StatusDenunciaEnum).map(key => ({
      value: key,
      viewValue: StatusDenunciaEnum[key as keyof typeof StatusDenunciaEnum]
    }));
  }

  getStatusDenunciaEnumObservable(): Observable<StatusDenunciaEnumModel[]> {
    const options: StatusDenunciaEnumModel[] = Object.keys(StatusDenunciaEnum).map(key => ({
      value: key,
      viewValue: StatusDenunciaEnum[key as keyof typeof StatusDenunciaEnum]
    }));
    return of(options);
  }

}
