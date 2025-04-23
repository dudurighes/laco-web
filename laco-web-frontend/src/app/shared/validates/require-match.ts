import { AbstractControl } from "@angular/forms";

export function RequireMatch(control: AbstractControl) {
  const selection: any = control.value;

  if (selection === null || selection === undefined || selection === '') {
    return null; // Não aplica a validação `incorrect` se o campo estiver vazio
  }

  if (typeof selection === 'string') {
    return { incorrect: true };
  }

  return null;
}
