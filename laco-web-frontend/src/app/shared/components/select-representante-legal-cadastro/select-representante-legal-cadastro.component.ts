import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {SnackBarMessageService} from '../snack-bar-message/snack-bar-message.service';
import {RepresentanteLegal} from "../../models/representanteLegal/representanteLegal.model";
import {
  DlgRepresentanteLegalCadastroComponent
} from "../dialog-representante-legal-cadastro/dlg-representante-legal-cadastro.component";

@Component({
  selector: 'app-select-representante-legal-cadastro',
  templateUrl: './select-representante-legal-cadastro.component.html',
  styleUrls: ['./select-representante-legal-cadastro.component.scss']
})
export class SelectRepresentanteLegalCadastroComponent implements OnInit {

  displayedColumns: string[] = ['column1', 'column2', 'column3'];

  @Input() parentControl: FormControl;

  @Input() label: string = "Representante Legal";

  @Input() required: boolean = true;

  listRepresentanteLegal: RepresentanteLegal[];

  constructor(private dialog: MatDialog,
              private messageService: SnackBarMessageService) {
  }

  ngOnInit(): void {

    this.listRepresentanteLegal = this.parentControl.value ? this.parentControl.value : [];

  }

  removeRepresentanteLegal(item: RepresentanteLegal, index: number) {
    this.listRepresentanteLegal.splice(index, 1);

    this.listRepresentanteLegal = [...this.listRepresentanteLegal]

    this.parentControl.setValue(this.listRepresentanteLegal);
  }

  atualizarRepresentanteLegal(item, index) {

    const dialogRef =
      this.dialog.open(DlgRepresentanteLegalCadastroComponent, {
        disableClose: true,
        height: 'auto',
        width: '600px',
        data: {representanteLegal: item}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) {
        this.listRepresentanteLegal[index] = result;

        this.listRepresentanteLegal = [...this.listRepresentanteLegal]
      }
    });

    this.parentControl.setValue(this.listRepresentanteLegal);
  }

  adicionarRepresentanteLegal() {


    const dialogRef =
      this.dialog.open(DlgRepresentanteLegalCadastroComponent, {
        disableClose: true,
        height: 'auto',
        width: '600px',
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) {
        const index = this.listRepresentanteLegal.findIndex(ra =>
          ra.cpf === result.cpf);
        if (index !== -1) {
          this.messageService.openSnackBarError("CPF ou Telefone já cadastrado!");
          return;
        } else {
          this.listRepresentanteLegal.push(result);
        }

        this.listRepresentanteLegal = [...this.listRepresentanteLegal]
      }
    });

    this.parentControl.setValue(this.listRepresentanteLegal);
  }

}
