import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes')
  },

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes')
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
  },

  {
    path: '**',
    redirectTo: 'home'
  }
];
