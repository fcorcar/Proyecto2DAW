import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./chat/pages/chat-page/chat-page.component'),
    title: 'Chat'
  },

  {
    path: 'admin',
    loadComponent: () => import('./admin/pages/admin-dashboard-page/admin-dashboard-page.component'),
    title: 'Admin Dashboard'
  },

  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login-page/login-page.component'),
    title: 'Login'
  },

  {
    path: 'registro',
    loadComponent: () => import('./auth/pages/register-page/register-page.component'),
    title: 'Registro'
  },

  {
    path: '**',
    redirectTo: ''
  }
];
