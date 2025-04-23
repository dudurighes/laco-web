import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, switchMap, } from 'rxjs';
import {NaturezaJuridica} from "../../../models/naturezaJuridica/natureza-juridica.model";
import {NaturezaJuridicaService} from "../../../../core/services/naturezaJuridica/natureza-juridica.service";

@Component({
  selector: 'app-autocomplete-natureza-juridica',
  templateUrl: './autocomplete-natureza-juridica.component.html',
  styleUrls: ['./autocomplete-natureza-juridica.component.scss']
})
export class AutocompleteNaturezaJuridicaComponent implements OnInit {


  @Input() parentControl: FormControl;

  @Input() label: string = "Natureza Jurídica";

  @Input() required: boolean = true;

  filteredOptions: Observable<NaturezaJuridica[]>;

  list: NaturezaJuridica[];


  constructor(private naturezaJuridicaService: NaturezaJuridicaService) { }

  ngOnInit() {
    this.naturezaJuridicaService.findAll().subscribe(
      result => {
        this.list = result;
        this.initFilter();
      }
    );
  }


  initFilter() {

    this.filteredOptions =

      this.parentControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.list.slice();
        }));

  }


  displayFn(value: NaturezaJuridica): string {
    return value && value.descricao ? value.numero + ' - ' + value.descricao : '';
  }


  private _filter(name: string): NaturezaJuridica[] {
    const filterValue = name.toLowerCase();

    return this.list.filter(option => (option.descricao.toLowerCase().includes(filterValue) || option.numero.toLowerCase().includes(filterValue)));
  }

}
