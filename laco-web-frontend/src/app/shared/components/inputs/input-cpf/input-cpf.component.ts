import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-cpf',
  templateUrl: './input-cpf.component.html',
  styleUrls: ['./input-cpf.component.scss']
})
export class InputCpfComponent implements OnInit {

  @Input() parentControl: FormControl;

  @Input() icon: string;

  @Input() required = true;

  @Input() label = "CPF";

  @Input() focus: boolean = false;

  @Input() readonly: boolean = false;

  constructor() { }

  ngOnInit(): void {

    if (this.readonly) {
      this.parentControl.disable();
    }

  }

}
