import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';


async function sleep() {
  return new Promise( resolve => {
    setTimeout(() => {
      resolve(true)
    }, 2000);
  })
}


export class FormUtils {
  // Expresiones regulares
  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  // Devuelve el msg de error correspondiente
  private static getTextError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        // Validaciones predeterminadas
        case 'required':
          return 'Campo requerido.';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min}.`;

        case 'email':
          return `Introduce un email válido.`;

        // Validaciones personalizadas
        case 'emailTaken':
          return `Este email ya está en uso.`;

        case 'notStrider':
          return `No es posible usar esta cadena.`;

        case 'pattern':
          switch (errors['pattern'].requiredPattern) {
            case this.emailPattern:
              return 'El formato del correo electrónico no es válido.';

            case this.namePattern:
              return 'Debe introducir nombre y apellido.';

            case this.notOnlySpacesPattern:
              return 'No puede contener espacios.';

            case this.passwordPattern:
              return 'Debe contener una mayúscula, una minúscula y un número.'

            default:
              return 'Pattern no controlado.';
          }

        default:
          return `Error no controlado "${key}".`;
      }
    }
    return null;
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  // Comprueba si un campo es valido
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  // Controla los msgs de error de los campos
  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;
    const errors = form.controls[fieldName].errors ?? {};
    return this.getTextError(errors);
  }

  // // Comprueba si un campo es valido (FormArray)
  // static isValidFieldInArray(
  //   formArray: FormArray,
  //   index: number,
  // ): boolean | null {
  //   return (
  //     !!formArray.controls[index].errors && formArray.controls[index].touched
  //   );
  // }

  // // Controla los msgs de error de los campos (FormArray)
  // static getFieldErrorInArray(
  //   formArray: FormArray,
  //   index: number,
  // ): string | null {
  //   if (formArray.controls.length === 0) return null;
  //   const errors = formArray.controls[index].errors ?? {};
  //   return this.getTextError(errors);
  // }


  ////////////////////////////////////////////////////////////////////////////////////////
  // Comprueba si un campo es igual a otro
  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { fieldsNotEqual: true };
    }
  }

  // Validacion asincrona
  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();

    const formValue = control.value;

    if (formValue === 'hola@mundo.es') {
      return {
        emailTaken: true,
      };
    }

    return null;
  }

  // Validacion sincrona
  static notStrider(control: AbstractControl): ValidationErrors | null {
    const formValue = control.value;
    return formValue === 'strider' ? {notStrider: true} : null;
  }
}
