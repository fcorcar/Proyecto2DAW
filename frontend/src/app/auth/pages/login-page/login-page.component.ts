import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { FormMsgErrorComponent } from "../../../shared/components/form-msg-error/form-msg-error.component";
import { environment } from '../../../../environments/environment';
import { RouterLink } from "@angular/router";
import { AlertMsgErrorComponent } from "../../../shared/components/alert-msg-error/alert-msg-error.component";
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [ReactiveFormsModule, FormMsgErrorComponent, RouterLink, AlertMsgErrorComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  projectName = environment.projectName;
  hasError = signal(false);
  isPosting = signal(false);

  authService = inject(AuthService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.passwordPattern)]]
  });



  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email, password).subscribe(resp => {
      console.log(resp)
    })
  }

}
