import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, switchMap, } from 'rxjs';
import {OrgaoEmissor} from "../../../models/orgaoEmissor/orgao-emissor.model";
import {OrgaoEmissorService} from "../../../../core/services/orgaoEmissor/orgao-emissor.service";

@Component({
  selector: 'app-autocomplete-orgao-emissor',
  templateUrl: './autocomplete-orgao-emissor.component.html',
  styleUrls: ['./autocomplete-orgao-emissor.component.scss']
})
export class AutocompleteOrgaoEmissorComponent implements OnInit {


  @Input() parentControl: FormControl;

  @Input() label: string = "Orgão Emissor";

  @Input() required: boolean = true;

  filteredOptions: Observable<OrgaoEmissor[]>;

  list: OrgaoEmissor[];


  constructor(private orgaoEmissorService: OrgaoEmissorService) { }

  ngOnInit() {
    this.orgaoEmissorService.findAll().subscribe(
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

  displayFn(value: OrgaoEmissor): string {
    return value && value.nome ? value.nome : '';
  }

  private _filter(name: string): OrgaoEmissor[] {
    const filterValue = name.toLowerCase();
    return this.list.filter(option => (option.nome.toLowerCase().includes(filterValue)));
  }

}
