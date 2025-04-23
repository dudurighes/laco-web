import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  model, OnChanges,
  OnInit,
  Output,
  signal, SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {AtividadeCnaeDTO} from "../../../models/cnae/atividade-cnae.model";
import {AtividadeCnaeService} from "../../../../core/services/cnae/atividade-cnae.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-autocomplete-cnae-list',
  templateUrl: './autocomplete-cnae-list.component.html',
  styleUrls: ['./autocomplete-cnae-list.component.scss']
})
export class AutocompleteCnaeListComponent implements OnInit, OnChanges {

  @Input() parentControl: FormControl = new FormControl();
  @Input() parentControlUnique: FormControl = new FormControl();

  @Input() label: string = "Atividades (CNAE)";
  @Input() required: boolean = true;

  @Input() multiple: boolean = true;

  @Output() listCnaes = new EventEmitter<AtividadeCnaeDTO[]>();

  @Input() cnaesSelecionadosInput: AtividadeCnaeDTO[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cnaesSelecionadosInput']) {
      this.cnaesSelecionados.set(changes['cnaesSelecionadosInput'].currentValue || []);
    }
  }

  selectable = true;
  removable = true;
  addOnBlur = true;

  separatorKeysCodes = [ENTER, COMMA] as const;

  currentCnae = model<AtividadeCnaeDTO | null>(null);
  cnaesSelecionados = signal<AtividadeCnaeDTO[]>([]);
  atividadeCnaeDBList: AtividadeCnaeDTO[] = [];

  atividadeCnaeFiltered: Observable<AtividadeCnaeDTO[]>;

  filteredCnaes = computed(() => {
    const filterValue = (this.currentCnae() as unknown as string)?.toLowerCase() || '';
    // Filtrar a lista de CNAEs, removendo aqueles que já estão selecionados
    return this.atividadeCnaeDBList.filter(cnae =>
      cnae.descricao.toLowerCase().includes(filterValue) &&
      !this.cnaesSelecionados().some(selected => selected.numero === cnae.numero)
    );
  });

  announcer = inject(LiveAnnouncer);

  constructor(private atividadeCnaeService: AtividadeCnaeService) {
  }

  ngOnInit() {

    this.atividadeCnaeService.findAll().subscribe(result => {
      this.atividadeCnaeDBList.push(...result);

      this.atividadeCnaeFiltered =

        this.parentControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.name;
            return name ? this._filter(name as string) : this.atividadeCnaeDBList.slice();
          }));

    });

    if (this.multiple) {
      this.cnaesSelecionados.set(this.parentControl.value ? this.parentControl.value : []);
    } else {
      this.parentControlUnique.setValue(this.parentControl.value || null);
    }
  }

  removeCnae(cnae: AtividadeCnaeDTO): void {
    this.cnaesSelecionados.update(cnaesSelecionados => {
      const index = cnaesSelecionados.indexOf(cnae);
      if (index >= 0) {
        cnaesSelecionados.splice(index, 1);
        this.announcer.announce(`Removed ${cnae.descricao}`);
      }
      this.listCnaes.emit(cnaesSelecionados);
      return [...cnaesSelecionados];
    });
  }

  selectedCnae(event: MatAutocompleteSelectedEvent): void {
    const selectedCnae = event.option.value as AtividadeCnaeDTO;
    if (this.multiple) {
      if (selectedCnae && !this.cnaesSelecionados().includes(selectedCnae)) {
        this.cnaesSelecionados.update(cnaesSelecionados =>
          [...cnaesSelecionados, selectedCnae]);
        this.listCnaes.emit(this.cnaesSelecionados());
      }
    } else {
      this.parentControlUnique.setValue(selectedCnae);
    }
    this.currentCnae.set(null);
    event.option.deselect();

  }

  displayFn(cnae: AtividadeCnaeDTO): string {
    return cnae && cnae.descricao ? `${cnae.numero} - ${cnae.descricao}` : '';
  }

  trackByFn(index: number, item: AtividadeCnaeDTO): string {
    return item.numero; // ou outro campo único que identifica o objeto
  }

  private _filter(name: string): AtividadeCnaeDTO[] {
    const filterValue = name.toLowerCase();
    return this.atividadeCnaeDBList.filter(option =>
      option.descricao.toLowerCase().includes(filterValue) || option.numero.toLowerCase().includes(filterValue));
  }

}
