import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import {SnackBarMessageService} from "../../../../shared/components/snack-bar-message/snack-bar-message.service";
import {ConfirmDialogComponent} from "../../../../shared/components/dialog/confirm-dialog/confirm-dialog.component";
import {ListaRecurso} from "../../../../shared/models/recurso/recurso.model";
import {RecursoService} from "../../../../core/services/recurso/recurso.service";

@Component({
  selector: 'app-lista-recurso',
  templateUrl: './recurso-listar.component.html',
  styleUrls: ['./recurso-listar.component.scss'],
})
export class RecursoListarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'icone', 'descricao', 'rota', 'uri', 'exibeMenu', 'action'];

  dataSource: MatTableDataSource<ListaRecurso>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private recursoService: RecursoService,
    private dialog: MatDialog,
    private messageService: SnackBarMessageService
  ) {}

  ngOnInit(): void {
    this.findRecurso();
  }

  findRecurso() {
    this.recursoService.findAll().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.delete(id);
      }
    });
  }

  delete(recursoId: number) {
    this.recursoService.delete(recursoId).subscribe(
      (result) => {
        this.messageService.openSnackBarSuccess('Inativado com sucesso');
        this.findRecurso();
      },
      (err) => {
        this.messageService.openSnackBarError(err.error.message);
      }
    );
  }
}
