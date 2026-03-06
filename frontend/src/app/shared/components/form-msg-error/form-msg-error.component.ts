import { Component, input } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-form-msg-error',
  imports: [],
  template: `
    @if (formUtils.isValidField(form(), fieldName())) {
      <span class="text-sm text-red-400">
        {{ formUtils.getFieldError(form(), fieldName()) }}
      </span>
    }
  `,
})
export class FormMsgErrorComponent {
  formUtils = FormUtils;

  form = input.required<FormGroup>();
  fieldName = input.required<string>();
}
