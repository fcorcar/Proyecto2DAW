import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  imports: [],
  templateUrl: './chat-page.component.html',
})
export class ChatPageComponent {

  authService = inject(AuthService);

}
