import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors => {
    if (formGroup.get('password').value === formGroup.get('confirmPassword').value)
    return {passwordMismatch: false};
    else
      return {passwordMismatch: true};
  };
