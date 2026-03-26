import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';


export const homeRoutes: Routes = [
  {
    path: '', // Ruta: /home
    component: HomeLayoutComponent,
    children: [
      {
        path: 'chat',
        component: ChatPageComponent,
        title: 'Chat',
      },

      {
        path: '**',
        redirectTo: 'chat'
      }
    ],
  },
];

export default homeRoutes;
