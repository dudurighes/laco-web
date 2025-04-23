import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user/user.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SessionService } from 'src/app/core/authentication/session.service';
import {EmpresaService} from "../../../../core/services/empresa/empresa.service";
import {ListaEmpresa} from "../../../../shared/models/empresa/empresa.model";
import {catchError, debounceTime, map, merge, of as ofasobservableOf, startWith, Subject, switchMap} from "rxjs";
import {SnackBarMessageService} from "../../../../shared/components/snack-bar-message/snack-bar-message.service";
import {ConfirmDialogComponent} from "../../../../shared/components/dialog/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './empresa-listar.component.html',
  styleUrls: ['./empresa-listar.component.scss']
})
export class EmpresaListarComponent implements AfterViewInit {

  search: string = "";
  resultsLength = 0;

  displayedColumns: string[] = [
    'id',
    'tipoEmpresa',
    'tipoPessoa',
    'cnpj-cpf',
    'nomeEmpresarial-nome',
    'situacao',
    'action'
  ];

  admin: boolean = false;

  dataSourceEmpresas: MatTableDataSource<ListaEmpresa> = new MatTableDataSource<ListaEmpresa>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchSubject = new Subject<Event>();

  constructor(private empresaService: EmpresaService,
    private session:SessionService,
    private router: Router,
    private messageService: SnackBarMessageService,
    private usuarioService: UserService,
    private dialog: MatDialog) { }

  ngAfterViewInit(): void {

    this.admin = this.session.isAdmin();

    this.searchSubject.pipe(debounceTime(300) ).subscribe((event: Event) => {
      const filterValue = (event.target as HTMLInputElement).value;
      this.search = filterValue.trim();
      this.initList();
    });

    this.initList();

  }

  initList() {

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.empresaService
            .findEmpresas(
              this.paginator.pageIndex,
              this.paginator.pageSize,
              this.search
            )
            .pipe(catchError(() => ofasobservableOf(null)));
        }),
        map((data) => {
          if (data === null) {
            return [];
          }
          this.resultsLength = data.size;
          return data.list;
        })
      )
      .subscribe((data) => (this.dataSourceEmpresas = new MatTableDataSource(data)));
  }

  applyFilter(event: Event) {
    this.searchSubject.next(event);
  }

  get isAdmin(){
    return this.session.isAdmin();
  }

  formatCpf(cpf: string): string {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatCnpj(cnpj: string): string {
    if (!cnpj) return '';
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  deleteEmpresa(empresaId: number) {
    this.empresaService.deleteEmpresa(empresaId).subscribe(
      (result) => {
        this.initList();
        this.messageService.openSnackBarSuccess("Empresa excluída com sucesso!");
      },
      error => {
        this.messageService.openSnackBarError(error.error.message);
      }
    );
  }

}
