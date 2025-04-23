import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Denuncia, TipoDenuncia} from "../../../../../shared/models/denuncia/denuncia.model";
import {MatPaginator} from "@angular/material/paginator";
import {catchError, merge, startWith, of as ofasobservableOf, Subject, switchMap, debounceTime, map} from "rxjs";
import {SnackBarMessageService} from "../../../../../shared/components/snack-bar-message/snack-bar-message.service";
import {SessionService} from "../../../../../core/authentication/session.service";
import {MatDialog} from "@angular/material/dialog";
import {DenunciaService} from "../../../../../core/services/denuncia/denuncia.service";
import {TipoDenunciaService} from "../../../../../core/services/tipo-denuncia/tipo-denuncia.service";
import {mapSituacao} from "../../../../../shared/models/enuns/situacao.enum";

@Component({
  selector: 'app-tipo-denuncia-listar',
  templateUrl: './tipo-denuncia-listar.component.html',
  styleUrls: ['./tipo-denuncia-listar.component.css']
})
export class TipoDenunciaListarComponent implements AfterViewInit {

  search: string = "";

  resultsLength = 0;

  displayedColumns: string[] = [
    'id',
    'descricao',
    'situacao',
    'action'
  ];

  json: any;

  dataSourceTipoDenuncia: TipoDenuncia[] = [];

  searchSubject = new Subject<Event>();

  constructor(private messageService: SnackBarMessageService,
              private tipoDenunciaService: TipoDenunciaService,
              private sessionService: SessionService,
              private dialog: MatDialog,) {
  }

  ngAfterViewInit(): void {
    this.tipoDenunciaService.findAllEmpresa().subscribe(
      result => {
        if (result && result.length > 0) {
          this.dataSourceTipoDenuncia = result;
        }
      }
    );
  }

  applyFilter(event: Event) {
    this.searchSubject.next(event);
  }

  delete(denunciaId: number) {
    this.tipoDenunciaService.delete(denunciaId).subscribe(
      (result) => {
        this.messageService.openSnackBarSuccess('Inativado com sucesso');
      },
      (err) => {
        this.messageService.openSnackBarError(err.error.message);
      }
    );
  }

}
