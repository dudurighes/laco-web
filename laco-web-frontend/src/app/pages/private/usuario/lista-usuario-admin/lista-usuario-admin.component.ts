import { SessionService } from 'src/app/core/authentication/session.service';
import { ConfirmDialogComponent } from '../../../../shared/components/dialog/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { SnackBarMessageService } from 'src/app/shared/components/snack-bar-message/snack-bar-message.service';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { ListarUsuario } from '../../../../shared/models/user/user.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lista-usuario-admin',
  templateUrl: './lista-usuario-admin.component.html',
  styleUrls: ['./lista-usuario-admin.component.scss'],
})
export class ListaUsuarioAdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'inv', 'action'];

  dataSource: MatTableDataSource<ListarUsuario>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private usuarioService: UserService,
    private dialog: MatDialog,
    private messageService: SnackBarMessageService,
    private sessionService: SessionService,
  ) {}

  ngOnInit(): void {
    this.findUsuario();
  }

  findUsuario() {
    this.usuarioService.findAll().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogResetSenha(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
       message:"Tem certeza que deseja resetar a senha?"
      },
      width: '350px',
    });


    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.resetPasswordAdmin(id)
      }
    });
  }

  resetPasswordAdmin(usuarioId: number): void{
    this.usuarioService.resetPasswordAdmin(usuarioId).subscribe(
      (result) => {
        this.messageService.openSnackBarSuccess('Senha resetada com sucesso');
        this.findUsuario();
      },
      (err) => {
        this.messageService.openSnackBarError(err.error.message);
      }
    );
  }

  alterarInv(any){

    this.usuarioService.alteraInv(any.id).subscribe(result => {
      this.messageService.openSnackBarSuccess('Alterado com sucesso');
    }, err => {
      this.messageService.openSnackBarError(err.error.message);
    })

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

  delete(userId: number) {
    this.usuarioService.deleteByAdmin(userId).subscribe(
      (result) => {
        this.messageService.openSnackBarSuccess('Inativado com sucesso');
        this.findUsuario();
      },
      (err) => {
        this.messageService.openSnackBarError(err.error.message);
      }
    );
  }

}
