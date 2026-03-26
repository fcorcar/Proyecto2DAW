import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  templateUrl: './chat-page.component.html',
})
export class ChatPageComponent {

  authService = inject(AuthService);

}
