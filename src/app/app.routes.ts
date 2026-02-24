import { Routes } from '@angular/router';
import { Countries } from './pages/countries/countries';
import { Landing } from './pages/landing/landing';
import { CountryDetail } from './pages/country-detail/country-detail';

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
    path: 'country/:code',
    component: CountryDetail,
  },
  {
    path: 'auth/signIn',
    loadComponent: () => import('./pages/sign-in/sign-in').then((m) => m.SignIn),
  },
  {
    path: 'auth/signUp',
    loadComponent: () => import('./pages/sign-up/sign-up').then((m) => m.SignUp),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
  },
  { path: '**', redirectTo: '' },
];
