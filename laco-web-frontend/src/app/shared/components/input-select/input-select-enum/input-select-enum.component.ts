import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-select-enum',
  templateUrl: './input-select-enum.component.html',
  styleUrls: ['./input-select-enum.component.scss'],
})
export class InputSelectEnumComponent {

  @Input() options: { value : any, viewValue: string } [] = [];
  @Input() parentControl: FormControl = new FormControl;
  @Input() label: string = "";
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;

}
