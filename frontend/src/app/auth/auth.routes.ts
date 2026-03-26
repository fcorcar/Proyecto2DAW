import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const authRoutes: Routes = [
  {
    path: '', // Ruta: /auth
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
        title: 'Login',
      },

      {
        path: 'registro',
        loadComponent: () => import('./pages/register-page/register-page.component'),
        title: 'Registro',
      },

      {
        path: '**',
        redirectTo: 'login'
      }
    ],
  },
];

export default authRoutes;
