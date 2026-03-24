import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, firstValueFrom, map } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export const IsAdminGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Convertimos tu maravilla de Señal (authStatus) en un Observable para poder ponerle reglas
  return toObservable(authService.authStatus).pipe(

    // REGLA 1: "Si el estado es 'checking', pausa el Guard. No hagas nada, solo espera."
    // (Esto es equivalente a tu @else que muestra los '...' en el HTML)
    filter(status => status !== 'checking'),

    // REGLA 2: "Cuando el estado por fin cambie (ya sea authenticated o not-authenticated), actúa."
    map(() => {

      // Aquí el estado ya se estabilizó. Leemos tus señales limpiamente.
      const isAuth = authService.authStatus() === 'authenticated';
      const isAdmin = authService.user()?.rol === 'admin';

      // Si todo coincide, pa' dentro
      if (isAuth && isAdmin) {
        return true;
      }

      // Si no, te mandamos al chat
      router.navigateByUrl('/home/chat');
      return false;
    })
  );
}
