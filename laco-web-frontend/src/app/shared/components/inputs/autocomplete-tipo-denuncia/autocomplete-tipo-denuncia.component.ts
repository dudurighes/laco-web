import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import {TipoDenuncia} from "../../../models/denuncia/denuncia.model";
import {TipoDenunciaService} from "../../../../core/services/tipo-denuncia/tipo-denuncia.service";

@Component({
  selector: 'app-autocomplete-tipo-denuncia',
  templateUrl: './autocomplete-tipo-denuncia.component.html',
  styleUrls: ['./autocomplete-tipo-denuncia.component.css']
})
export class AutocompleteTipoDenunciaComponent implements OnInit {

  @Input() parentControl: UntypedFormControl;

  @Input() label: string = "Tipo Denúncia";

  @Input() icon: string;

  @Input() required = false;

  isLoading = false;

  filteredOptions: TipoDenuncia[];

  constructor(private tipoDenunciaService: TipoDenunciaService) { }

  ngOnInit() {

    this.parentControl
    .valueChanges
    .pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value => this.tipoDenunciaService.findByDescricao({search: value},1)
      .pipe(
        finalize(() => this.isLoading = false),
        )
      )
    )
    .subscribe(munis => this.filteredOptions = munis);
  }

  displayFn(value: TipoDenuncia): string {
    return value && value.descricao ? value.descricao.toUpperCase() : '';
  }

}
