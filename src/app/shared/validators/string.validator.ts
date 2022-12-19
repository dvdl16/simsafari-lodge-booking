import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Custom validation class to handle password comparison and conditional required status
 */
export default class StringValidators {
    static match(controlName: string, checkControlName: string): ValidatorFn {
      return (controls: AbstractControl) => {
        const control = controls.get(controlName);
        const checkControl = controls.get(checkControlName);
  
        if (!control || !checkControl) {
          return null;
        }
  
        if (checkControl.errors && !checkControl.errors['matching']) {
          return null;
        }
  
        if (control.value !== checkControl.value) {
            checkControl.setErrors({ matching: true });
            return { matching: true };
        } else {
          return null;
        }
      };
    }
  }