import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';

export class FormUtils {
  // Expresiones regulares
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$';
  static alphanumericPattern = '^[a-zA-Z0-9]+$';

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
          return `Este correo electrónico ya está en uso.`;

        case 'notStrider':
          return `No es posible usar esta cadena.`;

        case 'pattern':
          switch (errors['pattern'].requiredPattern) {
            case this.emailPattern:
              return 'El formato del correo electrónico no es válido.';

            case this.alphanumericPattern:
              return 'Solo letras y números, sin espacios.';

            case this.passwordPattern:
              return 'Debe contener una mayúscula, una minúscula y un número.';

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

  ////////////////////////////////////////////////////////////////////////////////////////
  // Validacion asincrona
  static emailTakenValidator(authService: AuthService) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return timer(500).pipe(
        switchMap(() => authService.checkEmailTaken(control.value)),
        map((isTaken) => (isTaken ? { emailTaken: true } : null)),
        catchError(() => of(null)),
      );
    };
  }
}
