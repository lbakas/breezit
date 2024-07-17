import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noLetterAValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const containsA = /a/i.test(control.value);
    return containsA ? { noLetterA: { valid: false } } : null;
  };
}