import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'ava-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {

  message = "Tem certeza que deseja excluir?"

  title = "Atenção"

  closeButton: boolean = false;

  nivel: number = 1;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data && data.message) {
      this.message = data.message
    }
    if (data && data.title) {
      this.title = data.title
    }
    if (data && data.closeButton) {
      this.closeButton = data.closeButton
    }
    if (data && data.nivel) {
      this.nivel = data.nivel
    }
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  next() {

    if (this.nivel > 2) {
      this.message = "Essa ação é <b>irreversível</b>, tem certeza que deseja realizar essa <b>ação</b>?"
      this.nivel--;
      return;
    }

    if (this.nivel > 1) {
      this.message = "<b>Confirma</b> a ação?"
      this.nivel--
    } else {
      this.confirm()
    }
  }

}
