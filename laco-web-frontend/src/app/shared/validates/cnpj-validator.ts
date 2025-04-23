import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function CnpjValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cnpjInvalido = cnpjValido(control.value);
    const isCnpj = control?.value?.length > 11;

    if (!cnpjInvalido && isCnpj) {
      return { 'cnpj': true };
    }

    return null;
  };
}

function cnpjValido(cnpj: any): boolean {
  cnpj = !cnpj || cnpj.replace(/\D/g, '');

  const cnpjsInvsRegex = /1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14}|0{14}/;

  if (!cnpj || cnpj.length !== 14 || cnpjsInvsRegex.test(cnpj)) {
    return false;
  }

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(0), 10)) {
    return false;
  }

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  return (resultado === parseInt(digitos.charAt(1), 10));
}
