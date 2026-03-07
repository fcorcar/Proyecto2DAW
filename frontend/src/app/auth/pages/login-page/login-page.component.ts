import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { FormMsgErrorComponent } from "../../../shared/components/form-msg-error/form-msg-error.component";
import { environment } from '../../../../environments/environment';

@Component({
  imports: [ReactiveFormsModule, JsonPipe, FormMsgErrorComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);

  projectName = environment.projectName;

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.passwordPattern)]]
  });



  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
  }

}
