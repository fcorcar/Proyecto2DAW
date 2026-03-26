import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { FormMsgErrorComponent } from "../../../shared/components/form-msg-error/form-msg-error.component";
import { environment } from '../../../../environments/environment';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [ReactiveFormsModule, FormMsgErrorComponent, RouterLink],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  projectName = environment.projectName;


  // Formulario Login
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  // loginForm: FormGroup = this.fb.group({
  //   email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
  //   password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.passwordPattern)]]
  // });




  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email, password).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/home/chat');
        // console.log("yet");
        return;
      }
    });
  }

}
