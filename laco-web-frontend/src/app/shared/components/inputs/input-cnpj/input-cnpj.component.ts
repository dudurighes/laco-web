import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-cnpj',
  templateUrl: './input-cnpj.component.html',
  styleUrls: ['./input-cnpj.component.scss']
})
export class InputCnpjComponent implements OnInit {

  @Input()  parentControl: FormControl;

  @Input() focus: boolean = false;

  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {

  }

}
