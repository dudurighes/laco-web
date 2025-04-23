import { SessionService } from 'src/app/core/authentication/session.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {ListaPerfil} from "../../../../shared/models/perfil/perfil.model";
import {SnackBarMessageService} from "../../../../shared/components/snack-bar-message/snack-bar-message.service";
import {PerfilService} from "../../../../core/services/perfil/perfil.service";
import {ConfirmDialogComponent} from "../../../../shared/components/dialog/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-perfil-listar',
  templateUrl: './perfil-listar.component.html',
  styleUrls: ['./perfil-listar.component.scss'],
})
export class PerfilListarComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'nome',
    'roleNome',
    'action'
  ];

  dataSource: MatTableDataSource<ListaPerfil>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private perfilService: PerfilService,
    private dialog: MatDialog,
    private messageService: SnackBarMessageService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.findPerfil();
  }

  findPerfil() {
    this.perfilService.findAll().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    },
      err => {

        this.messageService.openSnackBarError(err.erro.message);
      }

    );
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

  delete(perfilId: number) {
    this.perfilService.delete(perfilId).subscribe(
      (result) => {
        this.messageService.openSnackBarSuccess('Inativado com sucesso');
        this.findPerfil();
      },
      (err) => {
        this.messageService.openSnackBarError(err.error.message);
      }
    );
  }
}
