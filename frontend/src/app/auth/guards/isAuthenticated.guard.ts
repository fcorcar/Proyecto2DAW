import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export const IsAuthenticatedGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[],
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return toObservable(authService.authStatus).pipe(
    filter((status) => status !== 'checking'),
    map(() => {
      const isAuth = authService.authStatus() === 'authenticated';

      if (isAuth) {
        return true;
      }

      router.navigateByUrl('/auth/login');
      return false;
    }),
  );
};
