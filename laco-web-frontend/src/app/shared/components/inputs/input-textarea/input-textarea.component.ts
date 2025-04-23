import { Component, Input } from '@angular/core';
import {  FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextAreaComponent {

  constructor() { }


  @Input() parentControl: FormControl;

  @Input() label: string;

  @Input() mask: string;

  @Input() required = true;

  @Input() icon: string;

  @Input() rows: string;


}
