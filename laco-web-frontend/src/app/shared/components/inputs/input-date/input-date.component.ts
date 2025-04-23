import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import {SnackBarMessageService} from "../../snack-bar-message/snack-bar-message.service";

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent implements OnInit {

  @ViewChild('picker') picker: any;

  @Input() parentControl: FormControl;

  @Input() label: string;

  @Input() time: boolean = false;

  @Input() callbackFunction?: () => void;

  @Input() readonly: boolean = false;

  @Input() dateFilter: any;

  @Input() usaFiltroMesRetroativo: boolean = false;

  @Input() appearance: string = 'outline';

  constructor(private messageService:SnackBarMessageService) { }

  ngOnInit() {

    if (this.readonly) {
      this.parentControl.disable();
    }

  }

  function() {

    this.filtroMesRetroativo();

    if (this.callbackFunction) {
      this.callbackFunction();
    }
  }

  filtroMesRetroativo(){
    if(this.usaFiltroMesRetroativo){
      let dataHoje = new Date();
      let dataSelecionada = new Date(this.parentControl.value);

      if(dataSelecionada.getMonth() < dataHoje.getMonth() && dataSelecionada.getFullYear() <= dataHoje.getFullYear()){
        this.parentControl.reset();
        this.messageService.openSnackBarError('Não é possível selecionar um mês retroativo.');
        return;
      }
    }
  }

}

