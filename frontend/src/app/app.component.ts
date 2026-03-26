import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertMsgErrorComponent } from "./shared/components/alert-msg-error/alert-msg-error.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertMsgErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
