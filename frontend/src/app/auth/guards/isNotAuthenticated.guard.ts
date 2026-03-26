import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

export const IsNotAuthenticatedGuard: CanMatchFn = (
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
        router.navigateByUrl('/home/chat');
        return false;
      }

      return true;
    }),
  );
};
