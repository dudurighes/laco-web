import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent implements OnInit {

  hide = true;

  @Input() label: string = "Senha";

  @Input() confirmPassword: boolean = false;

  @Input() disabled: boolean = false;

  @Input() requireInput: boolean = true;

  @Input() parentControl: FormControl;

  @Input() parentControlConfirm: FormControl;

  constructor() {
  }

  ngOnInit(): void {

  }

  isValidPasswordConfirm() {
    if (this.confirmPassword) {
      if (!(this.parentControl.value == this.parentControlConfirm.value)) {
        this.parentControlConfirm.setErrors({ 'passwordMismatch': true })
      }
    }

    if (this.disabled) {
      this.parentControl.disable();
    }
  }

}
