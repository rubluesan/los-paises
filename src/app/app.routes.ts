import { Routes } from '@angular/router';
import { Countries } from './pages/countries/countries';
import { Landing } from './pages/landing/landing';

export const routes: Routes = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'countries',
    component: Countries,
  },
  {
    path: 'auth/signIn',
    loadComponent: () => import('./pages/sign-in/sign-in').then((m) => m.SignIn),
  },
  { path: '**', redirectTo: '' },
];
