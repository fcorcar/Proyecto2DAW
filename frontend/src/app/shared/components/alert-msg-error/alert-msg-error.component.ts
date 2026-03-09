import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-alert-msg-error',
  imports: [],
  template: `
    @if (hasError()) {
      <div
        role="alert"
        class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md flex items-center gap-3 p-4 rounded-xl bg-red-950/80 border border-red-500/50 backdrop-blur-md text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-fade-in-down"
      >
        <i
          class="fa-regular fa-circle-xmark text-xl shrink-0 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
        ></i>

        <span class="text-sm font-medium">
          {{ msgError() }}
        </span>
      </div>
    }
  `,
})
export class AlertMsgErrorComponent {
  hasError = input.required<boolean>();
  msgError = input.required<string>();
}
