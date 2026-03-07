import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminDashboardPageComponent } from './pages/admin-dashboard-page/admin-dashboard-page.component';


export const adminRoutes: Routes = [
  {
    path: '', // Ruta: /admin
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardPageComponent,
        title: 'Admin Dashboard',
      },

      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ],
  },
];

export default adminRoutes;
