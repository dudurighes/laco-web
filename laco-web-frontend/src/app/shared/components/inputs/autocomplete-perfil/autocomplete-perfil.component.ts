import { ActivatedRoute } from '@angular/router';
import { PerfilService } from '../../../../core/services/perfil/perfil.service';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { ListaPerfil } from '../../../models/perfil/perfil.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-autocomplete-perfil',
  templateUrl: './autocomplete-perfil.component.html',
  styleUrls: ['./autocomplete-perfil.component.scss'],
})
export class AutocompletePerfilComponent implements OnInit {
  @Input() parentControl: FormControl;

  @Input() label: string = 'Perfil';

  @Input() required: boolean = true;

  @Input() empresaId: number;

  @Input() icon: string;

  filteredOptions: Observable<ListaPerfil[]>;

  list: ListaPerfil[];

  constructor(
    private perfilService: PerfilService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.empresaId != null ? this.findAllByEmpresaId() : this.findAll();

  }

  findAll() {
    this.perfilService.findAll().subscribe((result) => {
      this.list = result;
      this.initFilter();
    });
  }

  findAllByEmpresaId() {
    this.perfilService
      .findAllByEmpresaId(this.empresaId)
      .subscribe((result) => {
        this.list = result;
        this.initFilter();
      });
  }

  initFilter() {
    this.filteredOptions = this.parentControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.list.slice();
      })
    );
  }

  displayFn(value: ListaPerfil): string {
    return value && value.nome ? value.id + ' - ' + value.nome : '';
  }

  private _filter(name: string): ListaPerfil[] {
    const filterValue = name.toLowerCase();

    return this.list.filter((option) =>
      option.nome.toLowerCase().includes(filterValue)
    );
  }
}
