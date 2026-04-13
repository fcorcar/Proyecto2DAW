import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserAdmin } from '../../interfaces/user-admin.interface';

@Component({
  imports: [RouterLink],
  templateUrl: './admin-dashboard-page.component.html',
})
export class AdminDashboardPageComponent {
  authService = inject(AuthService);
  private adminService = inject(AdminService);

  usuariosResource = rxResource({
    loader: () => this.adminService.getUsers(),
  });

  statsResource = rxResource({
    loader: () => this.adminService.getStats(),
  });

  toggleBloqueo(usuario: UserAdmin) {
    this.adminService.toggleBlock(usuario.id).subscribe({
      next: (resp) => {
        usuario.esta_bloqueado = resp.esta_bloqueado;
      },
    });
  }
}
