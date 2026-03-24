import { Routes } from '@angular/router';
import { IsNotAuthenticatedGuard } from './auth/guards/isNotAuthenticated.guard';
import { IsAuthenticatedGuard } from './auth/guards/isAuthenticated.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes'),
    canMatch: [IsAuthenticatedGuard],
  },

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [IsNotAuthenticatedGuard],
  },

  {
    path: '**',
    redirectTo: 'home'
  }
];
