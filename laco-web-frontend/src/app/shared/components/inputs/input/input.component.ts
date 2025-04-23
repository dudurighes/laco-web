import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  @Input() parentControl: FormControl;

  @Input() styleCustom: string;

  @Input() classCustom: string;

  @Input() hint: string;

  @Input() uppercase: boolean = false;

  @Input() label: string;

  @Input() type: string = 'text';

  @Input() mask: string;

  @Input() maxlength: number;

  @Input() callbackFunction?: () => void;

  @Input() blurCallbackFunction?: () => void;

  @Output() blur = new EventEmitter<void>();

  @Input() required = true;

  @Input() icon: string;

  @Input() focus: boolean = false;

  @Input() options: any;

  @Input() eventBlur: boolean = false;

  @Input() readonly: boolean = false;

  constructor() {}

  ngOnInit(): void {

    if (this.readonly) {
      this.parentControl.disable();
    }

  }

  onBlur() {
    this.blur.emit();
  }

  function() {
    this.uppercase ? this.parentControl.setValue(this.parentControl.value.toUpperCase()) : null

    if (this.callbackFunction) {
      this.callbackFunction();
    }
  }

}
