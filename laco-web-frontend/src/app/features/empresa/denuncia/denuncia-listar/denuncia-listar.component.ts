import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Denuncia} from "../../../../../shared/models/denuncia/denuncia.model";
import {MatPaginator} from "@angular/material/paginator";
import {catchError, merge, startWith, of as ofasobservableOf, Subject, switchMap, debounceTime, map} from "rxjs";
import {SnackBarMessageService} from "../../../../../shared/components/snack-bar-message/snack-bar-message.service";
import {SessionService} from "../../../../../core/authentication/session.service";
import {MatDialog} from "@angular/material/dialog";
import {DenunciaService} from "../../../../../core/services/denuncia/denuncia.service";

@Component({
  selector: 'app-denuncia-listar',
  templateUrl: './denuncia-listar.component.html',
  styleUrls: ['./denuncia-listar.component.scss']
})
export class DenunciaListarComponent implements AfterViewInit {

  search: string = "";

  resultsLength = 0;

  displayedColumns: string[] = [
    'id',
    'dataOcorrido',
    'protocolo',
    'tipoEntrada',
    'action'
  ];

  json: any;

  dataSourceDenuncia: MatTableDataSource<Denuncia>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchSubject = new Subject<Event>();

  constructor(private messageService: SnackBarMessageService,
              private denunciaService: DenunciaService,
              private sessionService: SessionService,
              private dialog: MatDialog,) { }

  ngAfterViewInit(): void {
    this.searchSubject.pipe(debounceTime(300) ).subscribe((event: Event) => {
      const filterValue = (event.target as HTMLInputElement).value;
      this.search = filterValue.trim();
      this.initList();
    });

    this.initList();

    // this.isSuporte = this.sessionService.user.id == 3;
  }

  initList() {

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.denunciaService
            .findDenuncias(
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

          return data.denunciaDTOList;
        })
      )
      .subscribe((data) => (this.dataSourceDenuncia = new MatTableDataSource(data)));
  }


  applyFilter(event: Event) {
    this.searchSubject.next(event);
  }

  delete(denunciaId: number) {
    this.denunciaService.delete(denunciaId).subscribe(
      (result) => {
        this.messageService.openSnackBarSuccess('Inativado com sucesso');
        this.initList();
      },
      (err) => {
        this.messageService.openSnackBarError(err.error.message);
      }
    );
  }

}
