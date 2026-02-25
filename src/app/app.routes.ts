import { Routes } from '@angular/router';
import { Countries } from './pages/countries/countries';
import { Landing } from './pages/landing/landing';
import { CountryDetail } from './pages/country-detail/country-detail';
import { SignIn } from './pages/sign-in/sign-in';
import { SignUp } from './pages/sign-up/sign-up';
import { Profile } from './pages/profile/profile';

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
    component: SignIn,
  },
  {
    path: 'auth/signUp',
    component: SignUp,
  },
  {
    path: 'profile',
    component: Profile,
  },
  { path: '**', redirectTo: '' },
];
