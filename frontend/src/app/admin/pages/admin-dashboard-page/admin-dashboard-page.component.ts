import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink } from "@angular/router";

// Definimos la interfaz basada en tu modelo de Python
interface UsuarioAdmin {
  id: number;
  name: string;
  email: string;
  rol: string;
  esta_bloqueado: boolean;
}

@Component({
  imports: [RouterLink],
  templateUrl: './admin-dashboard-page.component.html',
})
export class AdminDashboardPageComponent {
  authService = inject(AuthService);

  // --- Estadísticas simuladas ---
  totalUsuarios: number = 142;
  totalConversaciones: number = 854;
  totalMensajes: number = 12450;

  // --- Lista de usuarios simulada ---
  usuarios: UsuarioAdmin[] = [
    { id: 1, name: 'test1', email: 'admin@nexus.local', rol: 'admin', esta_bloqueado: false },
    { id: 2, name: 'test2', email: 'juan@casa.local', rol: 'usuario', esta_bloqueado: false },
    { id: 3, name: 'test3', email: 'invitado@casa.local', rol: 'usuario', esta_bloqueado: true },
    { id: 4, name: 'test4', email: 'maria@casa.local', rol: 'usuario', esta_bloqueado: false },
  ];

  // --- Métodos de Acción ---
  toggleBloqueo(usuario: UsuarioAdmin) {
    // Aquí en el futuro llamarás a tu backend (ej: this.http.put(...))
    // Por ahora, solo cambiamos el estado visualmente
    usuario.esta_bloqueado = !usuario.esta_bloqueado;
  }

}
