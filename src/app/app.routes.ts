// app.routes.ts

import { Routes } from '@angular/router';
import { AuthGuard } from './_helpers';

export const routes: Routes = [
  {
    path: '',
    title: 'Star Wars',
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'login',
    title: 'Star Wars | Login',
    loadComponent: () => import('./login/login.component'),
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () => import('./register/register.component'),
  },
  {
    path: 'starships',
    title: 'Star Wars | Starships',
    loadComponent: () => import('./starships/starships-list/starships-list.component'),
    canActivate: [AuthGuard]
  },
  {
    path: 'starship/:id',
    title: 'Star Wars | Starship',
    loadComponent: () => import('../app/starships/starship-card/starship-card.component'),
  },
  {
    path: '**',
    title: 'Star Wars',
    redirectTo: '',
    pathMatch: 'full'
  }
];
