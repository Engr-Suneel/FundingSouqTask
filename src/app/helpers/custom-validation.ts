import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidation {

  static MaxCharacterLimit(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value: string = control.value || '';
      if (!value) {
        return null
      }
      return value.length <= 60 ? null : { maxCharacter: true };
    }
  }

  static PersoanlIdLimit(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value: string = control.value || '';
      if (!value) {
        return null
      }
      return value.length <= 11 ? null : { maxPersonalId: true };
    }
  }

  static NoWhiteSpace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { whitespace: true };
    }
  }
}