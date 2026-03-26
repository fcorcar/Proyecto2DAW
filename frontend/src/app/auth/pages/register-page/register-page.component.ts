import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FormMsgErrorComponent } from '../../../shared/components/form-msg-error/form-msg-error.component';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  imports: [ReactiveFormsModule, FormMsgErrorComponent, RouterLink],
  templateUrl: './register-page.component.html',
})
export default class RegisterPageComponent {
  private fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  projectName = environment.projectName;


  // Formulario Registro
  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(FormUtils.alphanumericPattern)]],
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)], [FormUtils.emailTakenValidator(this.authService)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.passwordPattern)]]
  });




  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { name = '', email = '', password = '' } = this.registerForm.value;

    this.authService.register(name, email, password).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/home/chat');
        // console.log("yet");
        return;
      }
    });
  }

}
