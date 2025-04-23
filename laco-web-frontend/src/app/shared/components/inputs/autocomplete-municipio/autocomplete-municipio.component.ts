import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { MunicipioService } from 'src/app/core/services/municipio/municipio.service';
import { Municipio } from 'src/app/shared/models/municipio/municipio.model';

@Component({
  selector: 'app-autocomplete-municipio',
  templateUrl: './autocomplete-municipio.component.html',
  styleUrls: ['./autocomplete-municipio.component.css']
})
export class AutocompleteMunicipioComponent implements OnInit {

  @Input() parentControl: UntypedFormControl;

  @Input() label: string = "Município";

  @Input() icon: string;

  @Input() required = false;

  isLoading = false;

  filteredOptions: Municipio[];

  constructor(private municipioService: MunicipioService) { }

  ngOnInit() {

    this.parentControl
    .valueChanges
    .pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value => this.municipioService.findByName({search: value},1)
      .pipe(
        finalize(() => this.isLoading = false),
        )
      )
    )
    .subscribe(munis => this.filteredOptions = munis);

  }


  displayFn(value: Municipio): string {
    return value && value.nome ? value.nome + " - " + value.estadoSigla : '';
  }


}
