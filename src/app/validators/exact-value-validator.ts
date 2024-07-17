import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function exactValueValidator(requiredValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null || control.value === '') {
      return null;
    }
    const isValid = Number(control.value) === requiredValue;
    return isValid ? null : { exactValue: { requiredValue, actualValue: control.value } };
  };
}
